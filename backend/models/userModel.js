const mongoose = require("mongoose");

// Define the User schema with validations
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minlength: [2, "First name must be at least 2 characters long"],
      maxlength: [50, "First name must not exceed 50 characters"],
      trim: true, // Removes extra spaces
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minlength: [2, "Last name must be at least 2 characters long"],
      maxlength: [50, "Last name must not exceed 50 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: function (v) {
          // Regex for email validation
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address`,
      },
    },
    phoneNumber: {
      type: Number,
      required: [true, "Phone number is required"],
      unique: true,
      validate: {
        validator: function (v) {
          // Regex for a valid 10-digit phone number
          return /^[0-9]{10}$/.test(v.toString());
        },
        message: (props) => `${props.value} is not a valid phone number`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [4, "Password must be at least 8 characters long"],
      maxlength: [128, "Password must not exceed 128 characters"],
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin", "moderator"], // Allowed roles
      default: "user",
    },
    otp: {
      type: String,
      validate: {
        validator: function (v) {
          // Ensure OTP is a 6-digit number
          return v == null || /^[0-9]{6}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid OTP`,
      },
    },
    otpExpiry: {
      type: Date,
      validate: {
        validator: function (v) {
          // Ensure otpExpiry is in the future
          return v == null || v > Date.now();
        },
        message: () => "OTP expiry date must be in the future",
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

// Create and export the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
