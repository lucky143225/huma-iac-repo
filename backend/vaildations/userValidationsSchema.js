const Joi = require('joi');

// User registration schema
const registerUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// User login schema
const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// User update schema
const updateUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
});

module.exports = {
  registerUserSchema,
  loginUserSchema,
  updateUserSchema,
};
