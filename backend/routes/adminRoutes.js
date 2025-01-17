const express = require("express");
const {
  updateUser,
  deleteUser,
  getAllUsers,
  register,
  login,
} = require("../controllers/adminController");
const validate = require("../middleware/userValidationMiddleware");
const {
  updateUserSchema,
  registerUserSchema,
  loginUserSchema,
} = require("../vaildations/userValidationsSchema");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", validate(registerUserSchema), register);
router.post("/login", validate(loginUserSchema), login);
router.put(
  "/update",
  verifyToken,
  isAdmin,
  validate(updateUserSchema),
  updateUser
);
router.delete("/delete", verifyToken, isAdmin, deleteUser);
router.get("/all-users", verifyToken, isAdmin, getAllUsers);

module.exports = router;
