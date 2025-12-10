const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const net = require('net');

let nginxProcess = null;

// Try to find an nginx binary at common absolute paths
function findNginxBinary() {
  const candidates = [
    '/usr/sbin/nginx',
    '/sbin/nginx',
    '/usr/local/sbin/nginx',
    '/usr/local/nginx/sbin/nginx',
    '/bin/nginx',
    'nginx' // fallback to PATH lookup
  ];

  for (const p of candidates) {
    try {
      if (p === 'nginx') {
        // let spawn handle PATH lookup later
        return 'nginx';
      }
      if (fs.existsSync(p)) return p;
    } catch (e) {
      // ignore
    }
  }
  return null;
}

// Start nginx on Lambda init (try absolute path first)
async function startNginx() {
  return new Promise((resolve, reject) => {
    const bin = findNginxBinary();
    if (!bin) {
      return reject(new Error('nginx binary not found'));
    }
    // Ensure /tmp/nginx and temp subdirs exist and are writable for logs/pid and temp files
    try {
      fs.mkdirSync('/tmp/nginx/tmp/client_body', { recursive: true });
      fs.mkdirSync('/tmp/nginx/tmp/proxy', { recursive: true });
      fs.mkdirSync('/tmp/nginx/tmp/fastcgi', { recursive: true });
      fs.mkdirSync('/tmp/nginx', { recursive: true });
      // create log files so nginx can open them
      try { fs.closeSync(fs.openSync('/tmp/nginx/error.log', 'a')); } catch(e){}
      try { fs.closeSync(fs.openSync('/tmp/nginx/access.log', 'a')); } catch(e){}
    } catch (e) {
      console.warn('Could not create /tmp/nginx directories:', e && e.message);
    }

    console.log(`Starting nginx using binary: ${bin}`);
    // Start nginx with explicit config path to ensure our nginx.conf is used
    nginxProcess = spawn(bin, ['-c', '/etc/nginx/nginx.conf', '-g', 'daemon off;'], {
      stdio: 'inherit',
      detached: false
    });

    nginxProcess.on('error', (err) => {
      console.error('Failed to start nginx:', err);
      reject(err);
    });

    // Give nginx time to start (short delay)
    setTimeout(() => {
      console.log('nginx started successfully');
      resolve();
    }, 300);
  });
}

// Minimal Node static server fallback (serves files from build output)
let nodeServer = null;
function startNodeStaticServer(root = '/usr/share/nginx/html', port = 8080) {
  if (nodeServer) return;
  const mime = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2'
  };

  nodeServer = http.createServer((req, res) => {
    try {
      let reqPath = decodeURIComponent(new URL(req.url, `http://localhost`).pathname);
      if (reqPath === '/') reqPath = '/index.html';
      const fullPath = path.join(root, reqPath);

      if (!fullPath.startsWith(root)) {
        res.writeHead(403);
        return res.end('Forbidden');
      }

      if (!fs.existsSync(fullPath) || fs.statSync(fullPath).isDirectory()) {
        // SPA fallback to index.html
        const indexPath = path.join(root, 'index.html');
        if (fs.existsSync(indexPath)) {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          fs.createReadStream(indexPath).pipe(res);
          return;
        }
        res.writeHead(404);
        return res.end('Not Found');
      }

      const ext = path.extname(fullPath).toLowerCase();
      const ct = mime[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': ct });
      fs.createReadStream(fullPath).pipe(res);
    } catch (err) {
      console.error('Static server error:', err);
      res.writeHead(500);
      res.end('Internal Server Error');
    }
  });

  nodeServer.listen(port, '127.0.0.1', () => {
    console.log(`Node static server listening on 127.0.0.1:${port}, root=${root}`);
  });
}

// Wait for a local TCP port to accept connections
function waitForPort(port, host = '127.0.0.1', timeoutMs = 3000, interval = 100) {
  return new Promise((resolve) => {
    const start = Date.now();
    function tryConnect() {
      const sock = new net.Socket();
      let done = false;
      sock.setTimeout(1000);
      sock.once('connect', () => {
        done = true;
        sock.destroy();
        resolve(true);
      });
      sock.once('error', () => {
        if (done) return;
        sock.destroy();
        if (Date.now() - start >= timeoutMs) return resolve(false);
        setTimeout(tryConnect, interval);
      });
      sock.once('timeout', () => {
        if (done) return;
        sock.destroy();
        if (Date.now() - start >= timeoutMs) return resolve(false);
        setTimeout(tryConnect, interval);
      });
      sock.connect(port, host);
    }
    tryConnect();
  });
}

// Lambda handler
exports.handler = async (event) => {
  try {
    // Start nginx on first invocation. If nginx binary is missing or fails to start,
    // fall back to a small Node static server that serves the built files.
    if (!nginxProcess && !nodeServer) {
      try {
        await startNginx();
        // Wait for nginx to accept connections on 127.0.0.1:8080
        const ok = await waitForPort(8080, '127.0.0.1', 3000, 100);
        if (!ok) {
          console.warn('nginx did not become ready within timeout, falling back to Node static server');
          startNodeStaticServer();
        }
      } catch (err) {
        console.warn('nginx failed to start, falling back to Node static server:', err && err.message);
        startNodeStaticServer();
      }
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
