const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_CONNECTION_URL; // Replace 'your_database_name' with your MongoDB database name
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection successful");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit the process with a failure code
  }
};

module.exports = connectDB;
