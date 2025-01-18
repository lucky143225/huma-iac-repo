const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("../config/s3Config");
const { S3Client, PutObjectAclCommand } = require("@aws-sdk/client-s3");
const { logger } = require("../config/logger"); // Assuming you have a logger utility
const FileMetadata = require("../models/fileUploadModels"); // Mongoose User model
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Configure Multer-S3 storage
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueName);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit for each file
});

const uploadMiddleware = upload.array("files", 10); // Up to 10 files at a time

// Function to update object ACL to public-read
const makeObjectPublic = async (key) => {
  try {
    // Log that the object is public (no need to modify ACL anymore)
    logger.info(`${key} is now public (via bucket policy).`);
  } catch (err) {
    logger.error("Error making object public:", err);
  }
};

// Controller function to handle file upload requests
const uploadFilesInDB = async (req, res) => {
  try {
    const { userId } = req.user;
    console.log(userId, "user id in token ");
    if (!userId) {
      logger.warn("userId is required");
      return res.status(400).json({ message: "userId is required" });
    }
    const { serviceName } = req.body; // Extract serviceName from form-data

    if (!serviceName) {
      logger.warn("Service name is required");
      return res.status(400).json({ message: "Service name is required" });
    }

    // Check if files are provided in the request
    if (!req.files || req.files.length === 0) {
      logger.warn("No files uploaded");
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Prepare files data and include userId
    const filesData = req.files.map(
      (file) => (
        console.log(file, "file data in upload"),
        {
          fileName: file.originalname,
          fileKey: file.key,
          file_type: file.contentType,
          fileLocation: file.location, // S3 file URL
          userId, // Attach userId to each file record
          fileSize: file.size, // Attach file size to each file record
          serviceName
        }
      )
    );

    // Save all file data in the database (e.g., MongoDB, SQL, etc.)
    const savedFiles = await FileMetadata.insertMany(filesData);

    // Optionally, make files public (if required)
    await Promise.all(req.files.map((file) => makeObjectPublic(file.key)));

    // Send success response with saved files data
    res.status(200).json({
      message: "Files uploaded successfully!",
      files: savedFiles, // Return the saved files data, including userId
    });
  } catch (err) {
    logger.error("Error uploading files:", err);
    res
      .status(500)
      .json({ message: "Error uploading files", error: err.message });
  }
};

// Controller to fetch files by userId
const getFilesByUser = async (req, res) => {
  try {
    const { userId } = req.user;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const files = await FileMetadata.find({ userId: new ObjectId(userId) });
    console.log(files, "files data in get file metadata");
    if (files.length === 0) {
      return res.status(404).json({ message: "No files found for this user" });
    }

    res.status(200).json({ files });
  } catch (err) {
    logger.error("Error fetching files:", err);
    res
      .status(500)
      .json({ message: "Error fetching files", error: err.message });
  }
};

// Controller to fetch a specific file by its key
const getFileByKey = async (req, res) => {
  try {
    const { fileKey } = req.query; // File key from the request parameters
    console.log(fileKey, "file");

    const file = await FileMetadata.findOne({ _id: fileKey });

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    res.status(200).json({ file });
  } catch (err) {
    logger.error("Error fetching file:", err);
    res
      .status(500)
      .json({ message: "Error fetching file", error: err.message });
  }
};
// Controller to update file metadata
const updateFileMetadata = async (req, res) => {
  try {
    const { fileKey } = req.query; // File key from the request params
    const { fileLocation } = req.body; // New location from the request body

    if (!fileLocation) {
      return res
        .status(400)
        .json({ message: "Location is required to update the file" });
    }
    const file = await FileMetadata.findOneAndUpdate(
      { key: fileKey },
      { fileLocation }, // Update the file's location
      { new: true } // Return the updated file
    );

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    res.status(200).json({ message: "File updated successfully", file });
  } catch (err) {
    logger.error("Error updating file:", err);
    res
      .status(500)
      .json({ message: "Error updating file", error: err.message });
  }
};
// Controller to delete a file
const deleteFile = async (req, res) => {
  try {
    const { fileKey } = req.query; // File key from the request params
    if (!fileKey) {
      return res.status(400).json({ message: "File key is required" });
    }
    const fileMetaData = await FileMetadata.findOne({ _id: fileKey });

    // Optionally, delete the file from S3 (using a utility function)
    await deleteFromS3(fileMetaData.fileName);
    // Delete the file from the database
    const deletedFile = await FileMetadata.findOneAndDelete({ _id: fileKey });
    if (!deletedFile) {
      return res.status(404).json({ message: "File not found" });
    }
    res.status(200).json({ message: "File deleted successfully" });
  } catch (err) {
    logger.error("Error deleting file:", err);
    res
      .status(500)
      .json({ message: "Error deleting file", error: err.message });
  }
};
const deleteAllFile = async (req, res) => {
  try {
    const { userId } = req.user;
    console.log(req.user, "user details in files");

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const allFiles = await FileMetadata.find({ userId: new ObjectId(userId) });
    console.log(allFiles, "files data in get file metadata");
    if (allFiles.length === 0) {
      return res.status(404).json({ message: "No files found for this user" });
    }

    if (!allFiles || allFiles.length === 0) {
      return res.status(404).json({ message: "No files found to delete" });
    }

    // Iterate through files and delete each from S3
    for (const file of allFiles) {
      await deleteFromS3(file.fileName);
    }

    // Delete all files from the database
    await FileMetadata.deleteMany();

    res.status(200).json({ message: "All files deleted successfully" });
  } catch (err) {
    logger.error("Error deleting all files:", err);
    res
      .status(500)
      .json({ message: "Error deleting all files", error: err.message });
  }
};
// Helper function to delete a file from S3
const deleteFromS3 = async (fileKey) => {
  // Use AWS SDK or your S3 client to delete the file
  const AWS = require("aws-sdk");
  const s3 = new AWS.S3();

  try {
    await s3
      .deleteObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileKey,
      })
      .promise();
  } catch (err) {
    console.error("Error deleting file from S3:", err);
    throw err;
  }
};

// Export the middleware and controller
module.exports = {
  uploadMiddleware,
  uploadFilesInDB,
  deleteFile,
  updateFileMetadata,
  getFileByKey,
  getFilesByUser,
  deleteAllFile,
};
