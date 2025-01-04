const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { hashPassword } = require('../utils/hashPassword');
const { generateToken } = require('../utils/generateToken');

// User Registration
async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user.id);

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
}

// User Login
async function login(req, res) {
  const { email, password } = req.body;
  
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(400).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = generateToken(user.id);
  
  res.status(200).json({ user, token });
}

// Update User
async function updateUser(req, res) {
  const { userId } = req.query;
  const { username, email } = req.body;
  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }
  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
}

// Delete User
async function deleteUser(req, res) {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }
  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed', error: error.message });
  }
}

module.exports = { register, login, updateUser, deleteUser };
