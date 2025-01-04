const express = require('express');
const { register, login, updateUser, deleteUser } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');
const validate = require('../middleware/userValidationMiddleware');
const {
    registerUserSchema,
    loginUserSchema,
    updateUserSchema,
  } = require('../vaildations/userValidationsSchema');
const router = express.Router();
console.log("Welcome to")
router.post('/register',validate(registerUserSchema), register);
router.post('/login', validate(loginUserSchema),login);
router.put('/update',verifyToken, validate(updateUserSchema), updateUser);
router.delete('/delete', verifyToken, deleteUser);

module.exports = router;
