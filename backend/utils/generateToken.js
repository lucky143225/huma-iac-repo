const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { userId: user.userID, role: user.userRole }, // Include 'role'
    process.env.SECRETKEY,
    { expiresIn: "1h" }
  );
};

module.exports = { generateToken };
