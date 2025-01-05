const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
require("dotenv").config();

// Temporary storage for OTPs and verified emails
const otpStorage = {};
const verifiedEmails = new Set(); // Store verified emails

// Email Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send OTP
async function sendEmailOtp(req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const otp = otpGenerator.generate(6, {
    digits: true,
    upperCase: false,
    specialChars: false,
  });
  otpStorage[email] = { otp, expiresAt: Date.now() + 300000 }; // 5 min expiry

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "OTP sent successfully!", otp: otp });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error });
  }
}

// Verify OTP
async function verifyEmailOtp(req, res) {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  const storedOtpData = otpStorage[email];
  if (!storedOtpData || Date.now() > storedOtpData.expiresAt) {
    return res.status(400).json({ message: "OTP expired or invalid" });
  }

  if (storedOtpData.otp === otp) {
    verifiedEmails.add(email); // Mark email as verified
    delete otpStorage[email]; // Clear OTP after verification
    return res.json({ message: "OTP verified successfully!" });
  }

  res.status(400).json({ message: "Invalid OTP" });
}

// Check Verification Status (Optional)
async function isVerified(email) {
  console.log(verifiedEmails, "Verified email");
  return verifiedEmails.has(email); // Check if email is verified
}

module.exports = { isVerified, verifyEmailOtp, sendEmailOtp };
