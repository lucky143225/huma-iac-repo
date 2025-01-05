const express = require("express");
const {
  verifyOTPAndRegister,
  login,
  updateUser,
  deleteUser,
  register,
} = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");
const validate = require("../middleware/userValidationMiddleware");
const {
  registerUserSchema,
  loginUserSchema,
  updateUserSchema,
} = require("../vaildations/userValidationsSchema");
const { sendOTP } = require("../utils/generateOtp");
const router = express.Router();

router.post("/send-otp", sendOTP);
router.post(
  "/verifyOTPAndRegister",
  validate(registerUserSchema),
  verifyOTPAndRegister
);
router.post('/register',validate(registerUserSchema), register);
router.post("/login", validate(loginUserSchema), login);
router.put("/update", verifyToken, validate(updateUserSchema), updateUser);
router.delete("/delete", verifyToken, deleteUser);

module.exports = router;
