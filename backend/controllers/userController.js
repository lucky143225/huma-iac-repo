const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // Mongoose User model
const { hashPassword } = require("../utils/hashPassword");
const { generateToken } = require("../utils/generateToken");
const { isVerified } = require("../utils/generateEmailOtp");
const { logger } = require("../config/logger"); // Importing the logger
const errorHandler = require("../middleware/errorMiddleware"); // Importing the error handler
// const FileMetadata = require("../models/fileUploadModels");

// User Registration
async function register(req, res) {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      logger.warn(`User with email ${email} already exists`);
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    await user.save();
    logger.info(`User registered successfully: ${email}`);
    res.status(201).json({ user });
  } catch (error) {
    logger.error(`Registration failed: ${error.message}`);
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
}

async function verifyEmailOtpAndRegister(req, res) {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    const isVerifiedOtp = await isVerified(email);

    if (!isVerifiedOtp) {
      logger.warn(`Email ${email} not verified`);
      return res
        .status(400)
        .json({ message: "Email is not verified. Please verify OTP first." });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      logger.warn(`User with email ${email} already exists`);
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      isVerified: isVerifiedOtp,
    });

    await user.save();
    logger.info(
      `User registered successfully after OTP verification: ${email}`
    );
    res.status(201).json({ user });
  } catch (error) {
    logger.error(`Registration failed: ${error.message}`);
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
}

async function verifyOTPAndRegister(req, res) {
  const { firstName, lastName, email, password, phoneNumber, otp } = req.body;

  try {
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      logger.warn(`User with phone number ${phoneNumber} not found`);
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await hashPassword(password);

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
      user.password = hashedPassword; // Hash password
      await user.save();

      logger.info(
        `User with phone number ${phoneNumber} registered successfully`
      );
      return res.status(200).json({ message: "User registered successfully." });
    } else {
      logger.warn(`Invalid OTP or OTP expired for phone number ${phoneNumber}`);
      return res.status(400).json({ message: "Invalid OTP or OTP expired." });
    }
  } catch (err) {
    logger.error(
      `Error verifying OTP for phone number ${phoneNumber}: ${err.message}`
    );
    res
      .status(500)
      .json({ message: "Error verifying OTP", error: err.message });
  }
}

// User Login
async function login(req, res) {
  const { email, password, phoneNumber } = req.body;
  let user;

  try {
    // Check if either email or phoneNumber is provided
    if (email) {
      user = await User.findOne({ email });
    } else if (phoneNumber) {
      user = await User.findOne({ phoneNumber });
    }

    // If user is not found
    if (!user) {
      logger.warn(
        `User with email/phone number not found: ${email || phoneNumber}`
      );
      return res.status(400).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(`Invalid credentials for user ${email || phoneNumber}`);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate and send token
    const token = generateToken({ userID: user.id, userRole: user.role });
    logger.info(`User logged in successfully: ${email || phoneNumber}`);
    res.status(200).json({ user, token });
  } catch (error) {
    logger.error(`Login failed: ${error.message}`);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
}
// Update User
async function updateUser(req, res) {
  const { userId } = req.user;
  // console.log(userId,"datatatatata");
  const { firstName, lastName, email, phoneNumber } = req.body;

  if (!userId) {
    logger.warn("userId is required");
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      logger.warn(`User with ID ${userId} not found`);
      return res.status(404).json({ message: "User not found" });
    }

    // Handle email update logic
    if (email) {
      if (user.email === email) {
        logger.warn("Email already exists for the user");
        return res.status(400).json({ message: "Email already exists" });
      }

      // Check if the email is already taken by another user
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        logger.warn("Email already exists for another user");
        return res.status(400).json({ message: "Email already exists" });
      }

      user.isVerified = false; // Reset email verification status when email is updated
      user.otp = null; // Clear OTP when email is updated
      user.otpExpiry = null; // Clear OTP expiry when email is updated

      // Check if the email is verified
      const isVerifiedOtp = await isVerified(email);
      if (!isVerifiedOtp) {
        logger.warn(`Email ${email} not verified`);
        return res
          .status(400)
          .json({ message: "Email is not verified. Please verify OTP first." });
      }

      user.email = email; // Update email if the email is verified
    }

    // Update other fields (firstName, lastName, phoneNumber)
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.phoneNumber = phoneNumber || user.phoneNumber;

    await user.save();
    logger.info(`User with ID ${userId} updated successfully`);
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    logger.error(`Update failed for user with ID ${userId}: ${error.message}`);
    res.status(500).json({ message: "Update failed", error: error.message });
  }
}

// Delete User
async function deleteUser(req, res) {
  console.log(req.user, "user data from token ");
  const { userId } = req.user;

  if (!userId) {
    logger.warn("userId is required");
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      logger.warn(`User with ID ${userId} not found`);
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();
    logger.info(`User with ID ${userId} deleted successfully`);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    logger.error(`Delete failed for user with ID ${userId}: ${error.message}`);
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
}

// get User Data
async function getUser(req, res) {
  const { userId } = req.user;

  if (!userId) {
    logger.warn("userId is required");
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      logger.warn(`User with ID ${userId} not found`);
      return res.status(404).json({ message: "User not found" });
    }

    logger.info(`User data retrieved successfully for ID ${userId}`);
    res.status(200).json({ user });
  } catch (error) {
    logger.error(
      `Failed to retrieve user data for user with ID ${userId}: ${error.message}`
    );
    res
      .status(500)
      .json({ message: "Failed to retrieve user data", error: error.message });
  }
}

module.exports = {
  register,
  verifyOTPAndRegister,
  login,
  updateUser,
  deleteUser,
  verifyEmailOtpAndRegister,
  getUser,
};
