const { spawn } = require('child_process');
const http = require('http');

let nginxProcess = null;

// Start nginx on Lambda init
async function startNginx() {
  return new Promise((resolve, reject) => {
    console.log('Starting nginx...');
    nginxProcess = spawn('nginx', ['-g', 'daemon off;'], {
      stdio: 'inherit',
      detached: false
    });

    nginxProcess.on('error', (err) => {
      console.error('Failed to start nginx:', err);
      reject(err);
    });

    // Give nginx time to start (200ms should be enough)
    setTimeout(() => {
      console.log('nginx started successfully');
      resolve();
    }, 200);
  });
}

// Lambda handler
exports.handler = async (event) => {
  try {
    // Start nginx on first invocation
    if (!nginxProcess) {
      await startNginx();
    }

    // Proxy the request to nginx on localhost:8080
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'localhost',
        port: 8080,
        path: event.rawPath || event.path || '/',
        method: event.requestContext?.http?.method || event.httpMethod || 'GET',
        headers: event.headers || {}
      };

      // Remove host header to avoid conflicts
      delete options.headers.host;

      const req = http.request(options, (res) => {
        let body = '';

        res.on('data', (chunk) => {
          body += chunk;
        });

        res.on('end', () => {
          // Determine if response is base64 encoded (for binary content)
          const contentType = res.headers['content-type'] || '';
          const isBase64 = /image|font|application\/pdf/.test(contentType);

          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: isBase64 ? Buffer.from(body).toString('base64') : body,
            isBase64Encoded: isBase64
          });
        });
      });

      req.on('error', (err) => {
        console.error('Proxy request failed:', err);
        reject({
          statusCode: 502,
          body: JSON.stringify({ error: 'Bad Gateway', details: err.message })
        });
      });

      // Handle request body for POST/PUT/PATCH
      if (event.body) {
        const bodyData = event.isBase64Encoded 
          ? Buffer.from(event.body, 'base64') 
          : event.body;
        req.write(bodyData);
      }

      req.end();
    });
  } catch (error) {
    console.error('Handler error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', details: error.message })
    };
  }
};
