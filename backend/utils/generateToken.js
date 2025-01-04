const jwt = require('jsonwebtoken');
const secretKey = 'test123'; // Replace with environment variable

function generateToken(userId) {
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
}

module.exports = { generateToken };
