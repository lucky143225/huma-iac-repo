const express = require("express");
const {
  verifyOTPAndRegister,
  login,
  updateUser,
  deleteUser,
  register,
  verifyEmailOtpAndRegister,
  getUser,
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
const { verify } = require("crypto");
const { userFileUpload } = require("../vaildations/fileVaildationsSchema");
const {
  uploadMiddleware,
  uploadFilesInDB,
  getFilesByUser,
  getFileByKey,
  updateFileMetadata,
  deleteFile,
  deleteAllFile,
} = require("../controllers/fileController");

const router = express.Router();

//---------> routes <----------------
router.get("/getUserData", verifyToken, getUser);
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

// files CRUD operations
router.post(
  "/uploadFiles",
  verifyToken,
  validate(userFileUpload),
  uploadMiddleware,
  uploadFilesInDB
);
router.get("/getAllUsersFiles", verifyToken, getFilesByUser);
router.get("/getUserFileDataByID", verifyToken, getFileByKey);
router.put(
  "/updateUserFileDataByID",
  verifyToken,
  validate(userFileUpload),
  updateFileMetadata
);
router.delete("/deleteFileData", verifyToken, deleteFile);
router.delete("/deleteAllFiles", verifyToken, deleteAllFile);

module.exports = router;
