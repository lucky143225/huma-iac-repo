const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./config/logger');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const errorHandler = require('./middleware/errorMiddleware');
const sequelize = require('./config/database'); // Import the Sequelize instance

const app = express();

app.use(bodyParser.json());
app.use(logger); // HTTP request logging

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

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

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
