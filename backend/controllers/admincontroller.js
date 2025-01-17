const User = require("../models/userModel");
const { hashPassword } = require("../utils/hashPassword");
const { generateToken } = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const { logger } = require("../config/logger"); // Importing the logger
const errorHandler = require("../middleware/errorMiddleware"); // Importing the error handler

// Admin Registration
async function register(req, res, next) {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      logger.error(`User with email ${email} already exists`);
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      role: "admin", // Admin role is hardcoded for simplicity
    });

    await user.save();
    const token = generateToken({ userID: user.id, userRole: user.role });

    logger.info(`Admin registered with email: ${email}`);
    res.status(201).json({ user, token });
  } catch (error) {
    logger.error(`Registration failed: ${error.message}`);
    next(error); // Pass the error to the error handler
  }
}

// Admin Login
async function login(req, res, next) {
  const { email, password, phoneNumber } = req.body;
  let user;

  try {
    if (email) {
      user = await User.findOne({ email });
      if (!user) {
        logger.warn(`Login failed: User with email ${email} not found`);
        return res.status(400).json({ message: "User not found" });
      }
    } else if (phoneNumber) {
      user = await User.findOne({ phoneNumber });
      if (!user) {
        logger.warn(
          `Login failed: User with phone number ${phoneNumber} not found`
        );
        return res.status(400).json({ message: "User not found" });
      }
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(`Login failed: Invalid credentials for user ${user.email}`);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken({ userID: user.id, userRole: user.role });

    logger.info(`User logged in: ${user.email}`);
    res.status(200).json({ user, token });
  } catch (error) {
    logger.error(`Login failed: ${error.message}`);
    next(error); // Pass the error to the error handler
  }
}

// Admin can update user
async function updateUser(req, res, next) {
  const { userId } = req.query; // Use query for better REST practices
  if (!userId) {
    logger.warn("User ID is required to update user");
    return res.status(400).json({ message: "userId is required" });
  }

  const { firstName, lastName, email, phoneNumber } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      logger.warn(`User with ID ${userId} not found`);
      return res.status(404).json({ message: "User not found" });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;

    await user.save();

    logger.info(`User updated successfully: ${userId}`);
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    logger.error(`Update failed: ${error.message}`);
    next(error); // Pass the error to the error handler
  }
}

// Admin can delete user
async function deleteUser(req, res, next) {
  const { userId } = req.query; // Use query for better REST practices
  if (!userId) {
    logger.warn("User ID is required to delete user");
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      logger.warn(`User with ID ${userId} not found`);
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();

    logger.info(`User deleted successfully: ${userId}`);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    logger.error(`Delete failed: ${error.message}`);
    next(error); // Pass the error to the error handler
  }
}

// Admin can get all users
async function getAllUsers(req, res, next) {
  try {
    const users = await User.find({ role: "user" });
    logger.info("Fetched all users successfully");
    res.status(200).json({ users });
  } catch (error) {
    logger.error(`Fetching users failed: ${error.message}`);
    next(error); // Pass the error to the error handler
  }
}

module.exports = { updateUser, deleteUser, getAllUsers, register, login };
