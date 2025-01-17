const path = require("path");
const winston = require("winston");
const morgan = require("morgan");
const fs = require("fs");

// Create a logs directory if it doesn't exist
const logDirectory = path.join(__dirname, "../logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

// Define file paths for different log levels
const allLogFilePath = path.join(logDirectory, "allLogData.log");
const infoLogFilePath = path.join(logDirectory, "info.log");
const warnLogFilePath = path.join(logDirectory, "warn.log");
const errorLogFilePath = path.join(logDirectory, "error.log");

// Winston logger setup
const logger = winston.createLogger({
  level: "info", // Default log level
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(
      ({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`
    )
  ),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }), // Console log
    new winston.transports.File({ filename: allLogFilePath }), // Log all levels
    new winston.transports.File({ filename: infoLogFilePath, level: "info" }), // Info logs
    new winston.transports.File({ filename: warnLogFilePath, level: "warn" }), // Warn logs
    new winston.transports.File({ filename: errorLogFilePath, level: "error" }), // Error logs
  ],
});

// Morgan middleware for HTTP request logging
const morganLogger = morgan("combined", {
  stream: fs.createWriteStream(path.join(logDirectory, "httpRequests.log"), { flags: "a" }),
});

module.exports = { logger, morganLogger };
