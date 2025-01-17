const Joi = require("joi");

// User registration schema
const registerUserSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(), // Increased min length to 2
  lastName: Joi.string().min(2).max(50).required(), // Increased min length to 2
  email: Joi.string().email().required(),
  phoneNumber: Joi.number().required(), // Ensure 10 digits
  password: Joi.string().min(4).max(128).required(), // Increased min length to 8
});

// User login schema
const loginUserSchema = Joi.object({
  email: Joi.string().email(),
  phoneNumber: Joi.number(), // Ensure 10 digits
  password: Joi.string().min(4).max(128).required(), // Increased min length to 8
});

// User update schema
const updateUserSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).optional(), // Increased min length to 2
  lastName: Joi.string().min(2).max(50).optional(), // Increased min length to 2
  email: Joi.string().email().optional(),
  phoneNumber: Joi.number().optional(), // Ensure 10 digits
  password: Joi.string().min(4).max(128).optional(), // Increased min length to 8
});

module.exports = {
  registerUserSchema,
  loginUserSchema,
  updateUserSchema,
};
