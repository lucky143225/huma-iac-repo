const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./config/logger');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const errorHandler = require('./middleware/errorMiddleware');
const sequelize = require('./config/database'); // Import the Sequelize instance
const { configDotenv } = require("dotenv").config();
const app = express();
const cors = require('cors')

const corsOptions = {
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],   // Allowed headers
  credentials: true, // Allow cookies and authorization headers
};
app.use(bodyParser.json());
app.use(logger); // HTTP request logging
app.use(cors(corsOptions))

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Welcome Lakshmi Narayana Reddy!');
});


// Global error handler
app.use(errorHandler);

// Sync Sequelize models with the database (creates tables if they don't exist)
sequelize.sync({ force: false }) // { force: false } to not drop tables, { force: true } will drop and recreate
  .then(() => {
    console.log('Database synced successfully!');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

  const PORT = process.env.BACKEND_PORT  || 3000;
app.listen(PORT, () => {
  console.log(`Port running on : ${PORT}`);
});
