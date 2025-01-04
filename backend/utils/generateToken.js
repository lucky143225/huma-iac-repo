const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, role: user.role }, // Include 'role'
    process.env.SECRETKEY,
    { expiresIn: '1h' }
  );
};

module.exports = { generateToken };
