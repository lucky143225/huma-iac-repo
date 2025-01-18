const User = require("../models/userModel");
const twilio = require("twilio");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Twilio Configuration
const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Generate Random 6-Digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

// **1. Send OTP**
async function sendOTP(req, res) {
  const { phoneNumber } = req.body;

  try {
    let user = await User.findOne({ where: { phoneNumber } });

    // Generate OTP and expiry
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry
    console.log(otp, otpExpiry, "otp", "...... user", user);
    if (!user) {
      // Create new user entry with OTP
      user = await User.create({
        phoneNumber,
        otp,
        otpExpiry,
        isVerified: false,
      });
    } else {
      // Update OTP and expiry for existing user
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save();
    }

    // Send OTP via Twilio
    try {
      console.log(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN,
        client,
        "cillent"
      );
      const response = await client.messages.create({
        body: `Your OTP code is ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber,
      });
      console.log("Message sent successfully:", response.sid);
    } catch (error) {
      console.error("Failed to send OTP:", error.message);
      res
        .status(500)
        .json({ message: "Failed to send OTP", error: error.message });
    }
  } catch (err) {
    res.status(500).json({ message: "Error sending OTP", error: err.message });
  }
}
module.exports = { sendOTP, generateOTP };
