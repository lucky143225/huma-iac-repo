const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phoneNumber:{
    type: DataTypes.NUMBER,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user',
  },
  otp: {
    type: DataTypes.STRING,
  },
  otpExpiry: {
    type: DataTypes.DATE,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;
