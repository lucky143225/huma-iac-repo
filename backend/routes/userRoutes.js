const express = require("express");
const {
  verifyOTPAndRegister,
  login,
  updateUser,
  deleteUser,
  register,
  verifyEmailOtpAndRegister,
} = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");
const validate = require("../middleware/userValidationMiddleware");
const {
  registerUserSchema,
  loginUserSchema,
  updateUserSchema,
} = require("../vaildations/userValidationsSchema");
const { sendOTP } = require("../utils/generateOtp");
const { sendEmailOtp, verifyEmailOtp } = require("../utils/generateEmailOtp");
const router = express.Router();

//---------> routes <----------------
router.post("/send-otp", sendOTP);
router.post(
  "/verifyOTPAndRegister",
  validate(registerUserSchema),
  verifyOTPAndRegister
);
router.post(
  "/verifyEmailOTPAndRegister",
  validate(registerUserSchema),
  verifyEmailOtpAndRegister
);
router.post("/register", validate(registerUserSchema), register);
router.post("/login", validate(loginUserSchema), login);
router.put("/update", verifyToken, validate(updateUserSchema), updateUser);
router.delete("/delete", verifyToken, deleteUser);
router.post("/send-email-otp", sendEmailOtp);
router.post("/verify-email-otp", verifyEmailOtp);

module.exports = router;
