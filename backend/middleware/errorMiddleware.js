const { logger } = require("../config/logger"); // Import winston logger

const errorHandler = (err, req, res, next) => {
  // Log the error stack
  logger.error(err.stack);

  // Send a generic error response
  res.status(500).json({ message: "Something went wrong!" });
};

module.exports = errorHandler;
