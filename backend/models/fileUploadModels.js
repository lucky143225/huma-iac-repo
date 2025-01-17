const mongoose = require("mongoose");

const fileMetadataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  fileKey: {
    type: String,
    required: true,
  },
  file_type: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number,
    required: true,
  },
  fileLocation: {
    type: String, // S3 URL
    required: true,
  },
  serviceName:{
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

const FileMetadata = mongoose.model("FileMetadata", fileMetadataSchema);
module.exports = FileMetadata;
