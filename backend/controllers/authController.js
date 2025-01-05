const User = require('../models/userModel');
const twilio = require('twilio');
const bcrypt = require('bcryptjs');

// **2. Verify OTP and Register User**
exports.verifyOTPAndRegister = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, otp } = req.body;

  try {
    const user = await User.findOne({ where: { phoneNumber } });

    if (!user) return res.status(404).json({ message: 'User not found' });

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

      return res.status(200).json({ message: 'User registered successfully.' });
    } else {
      return res.status(400).json({ message: 'Invalid OTP or OTP expired.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error verifying OTP', error: err.message });
  }
};
