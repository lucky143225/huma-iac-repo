const { urlencoded } = require("body-parser");
const User = require("../models/userModel");
const { hashPassword } = require("../utils/hashPassword");
const { generateToken } = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
// Admin Registration
async function register(req, res) {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    const userExists = await User.findOne({ where: { email } });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      role: "admin", // Admin role is hardcoded for simplicity
    });
    const token = generateToken(user);

    res.status(201).json({ user, token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
}
async function login(req, res) {
  const { email, password, phoneNumber } = req.body;
  let user;
  if (req.body.email) {
    user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "User not found" });
  }
  if (req.body.phoneNumber) {
    user = await User.findOne({ where: { phoneNumber } });
    if (!user) return res.status(400).json({ message: "User not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  const token = await generateToken(user);

  res.status(200).json({ user, token });
}
// Admin can update user
async function updateUser(req, res) {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }
  const { firstName, lastName, email, phoneNumber } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;

    await user.save();
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
}

// Admin can delete user
async function deleteUser(req, res) {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }
  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
}

// Admin can get all users
async function getAllUsers(req, res) {
  try {
    const users = await User.findAll({ where: { role: "user" } });
    res.status(200).json({ users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Fetching users failed", error: error.message });
  }
}

module.exports = { updateUser, deleteUser, getAllUsers, register, login };
