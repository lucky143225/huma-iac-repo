const express = require('express');
const { updateUser, deleteUser, getAllUsers, register, login } = require('../controllers/admincontroller');
const validate = require('../middleware/userValidationMiddleware');
const { updateUserSchema, registerUserSchema, loginUserSchema } = require('../vaildations/userValidationsSchema');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
  
const router = express.Router();

router.post('/register',validate(registerUserSchema), register);
router.post('/login', validate(loginUserSchema),login);
router.put('/update', isAdmin,verifyToken, validate(updateUserSchema),updateUser);
router.delete('/delete',isAdmin, verifyToken, deleteUser);
router.get('/all-users', verifyToken, isAdmin,  getAllUsers);

module.exports = router;
