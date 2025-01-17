const jwt = require("jsonwebtoken");
const { logger } = require("../config/logger"); // Importing the logger

function verifyToken(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    // Verify the token and decode user information
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    req.user = decoded;
    next();
  } catch (err) {
    logger.error("Token verification failed:", err.message);
    res.status(401).json({ message: "Token is not valid" });
  }
}
// Admin Role Middleware
function isAdmin(req, res, next) {
  logger.log("isAdmin", req.user);
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).send("Access Denied: Admins only");
  }
  next();
}

module.exports = { verifyToken, isAdmin };
