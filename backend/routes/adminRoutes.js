const express = require('express');
const { updateUser, deleteUser, getAllUsers } = require('../controllers/admincontroller');
const verifyToken = require('../middleware/authMiddleware');
const validate = require('../middleware/userValidationMiddleware');
const { updateUserSchema } = require('../vaildations/userValidationsSchema');
  
const router = express.Router();

router.put('/update', verifyToken, validate(updateUserSchema),updateUser);
router.delete('/delete', verifyToken, deleteUser);
router.get('/all-users', verifyToken, getAllUsers);

module.exports = router;
