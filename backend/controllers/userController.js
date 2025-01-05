const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { hashPassword } = require('../utils/hashPassword');
const { generateToken } = require('../utils/generateToken');

// User Registration
async function register(req, res) {
  try {
    const { firstName, email, phoneNumber, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await User.create({
      firstName,
      email,
      password: hashedPassword,
      phoneNumber,
    });
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
}
async function verifyOTPAndRegister(req, res) {
  const { firstName, lastName, email, password, phoneNumber, otp } = req.body;

  try {
    const user = await User.findOne({ where: { phoneNumber } });

    if (!user) return res.status(404).json({ message: 'User not found' });

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

      return res.status(200).json({ message: 'User registered successfully.' });
    } else {
      return res.status(400).json({ message: 'Invalid OTP or OTP expired.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error verifying OTP', error: err.message });
  }
};

// User Login
async function login(req, res) {
  const { email, password, phoneNumber } = req.body;
  let user;
  if(req.body.email){
   user = await User.findOne({ where: { email } });
  if (!user) return res.status(400).json({ message: 'User not found' });
  }
  if(req.body.phoneNumber){
     user = await User.findOne({ where: { phoneNumber } });
    if (!user) return res.status(400).json({ message: 'User not found' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = generateToken(user.id);
  
  res.status(200).json({ user, token });
}

// Update User
async function updateUser(req, res) {
  const { userId } = req.query;
  const { firstName, lastName, email, phoneNumber } = req.body;
  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }
  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;

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

module.exports = { register, verifyOTPAndRegister, login, updateUser, deleteUser };
