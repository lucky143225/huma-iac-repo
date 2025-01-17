const Joi = require("joi");

// File upload schema
const userFileUpload = Joi.object({
  userId: Joi.string(), // User ID must be a string and required
  files: Joi.array().items(
    Joi.object({
      filename: Joi.string().required(), // File name should be a required string
      mimetype: Joi.string()
        .valid("image/jpeg", "image/png", "application/pdf")
        .required(), // Valid MIME types for the file
      size: Joi.number()
        .max(10 * 1024 * 1024)
        .required(), // File size should not exceed 10 MB
    })
  ), // Array of files is required
});

module.exports = { userFileUpload };
