const express = require("express");
const bodyParser = require("body-parser");
const { morganLogger } = require("./config/logger");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const connectDB = require("./config/database"); // Import the MongoDB connection function
require("dotenv").config();
const cors = require("cors");

const app = express();

// Configure CORS options
const corsOptions = {
  origin: "*", // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Allow cookies and authorization headers
};
app.use(cors(corsOptions));

// Middleware for parsing JSON requests
app.use(bodyParser.json());
app.use(morganLogger); // HTTP request logging

// Connect to MongoDB
connectDB();

// Define routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Welcome Lakshmi Narayana Reddy!");
});

// Global error handler
app.use(errorHandler);

// Start the server
const PORT = process.env.BACKEND_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
