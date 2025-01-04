const jwt = require('jsonwebtoken');
const secretKey = 'test123'; // Replace with environment variable

function verifyToken(req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
      return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

  try {
      // Verify the token and decode user information
      const decoded = jwt.verify(token, secretKey);
      req.user = decoded; // Attach the decoded user information to the request object
      next(); // Proceed to the next middleware or route handler
  } catch (err) {
      console.error('Token verification failed:', err.message);
      res.status(401).json({ message: 'Token is not valid' });
  }
}

module.exports = verifyToken;
