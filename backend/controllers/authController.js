const User = require("../models/userModel"); // Assuming Mongoose User model is used
const bcrypt = require("bcryptjs");
const { logger } = require("../config/logger"); // Importing the logger
const errorHandler = require("../middleware/errorMiddleware"); // Importing the error handler// Import the logger

// **2. Verify OTP and Register User**
exports.verifyOTPAndRegister = async (req, res, next) => {
  const { firstName, lastName, email, password, phoneNumber, otp } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      logger.warn(`User with phone number ${phoneNumber} not found`);
      return res.status(404).json({ message: "User not found" });
    }

    // Check OTP validity
    if (user.otp === otp && user.otpExpiry > new Date()) {
      // Mark phone as verified
      user.isVerified = true;
      user.otp = null; // Clear OTP
      user.otpExpiry = null;

      // Save other user details
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.password = await bcrypt.hash(password, 10); // Hash password

      await user.save();

      logger.info(
        `User registered successfully with phone number: ${phoneNumber}`
      );
      return res.status(200).json({ message: "User registered successfully." });
    } else {
      logger.warn(
        `Invalid OTP or OTP expired for phone number: ${phoneNumber}`
      );
      return res.status(400).json({ message: "Invalid OTP or OTP expired." });
    }
  } catch (err) {
    logger.error(
      `Error verifying OTP for phone number: ${phoneNumber} - ${err.message}`
    );
    return next(err); // Pass error to the error handler
  }
};
