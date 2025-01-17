const path = require('path');
const winston = require('winston');
const morgan = require('morgan');

// Create a logs directory if it doesn't exist
const logDirectory = path.join(__dirname, '../logs');
const logFilePath = path.join(logDirectory, 'app.log');

// Ensure the log directory exists (for platforms that may not create directories automatically)
const fs = require('fs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

// Winston logger setup for error logging
const logger = winston.createLogger({
  level: 'info', // Default log level
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }), // Console log
    new winston.transports.File({ filename: logFilePath }), // Log file
  ],
});

// Morgan middleware for HTTP request logging
const morganLogger = morgan('combined');

module.exports = { logger, morganLogger };
