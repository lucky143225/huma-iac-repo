const Joi = require('joi');

// User registration schema
const registerUserSchema = Joi.object({
  firstName: Joi.string().min(3).max(30),
  lastName:Joi.string().min(3).max(30),
  email: Joi.string().email(),
  phoneNumber: Joi.number(),
  password: Joi.string().min(6),
});

// User login schema
const loginUserSchema = Joi.object({
  email: Joi.string().email(),
  phoneNumber: Joi.number(),
  password: Joi.string(),
});

// User update schema
const updateUserSchema = Joi.object({
  firstName: Joi.string().min(3).max(30).optional(),
  lastName:Joi.string().min(3).max(30),
  email: Joi.string().email().optional(),
  phoneNumber: Joi.number(),
  password: Joi.string().min(6).optional(),
});

module.exports = {
  registerUserSchema,
  loginUserSchema,
  updateUserSchema,
};
