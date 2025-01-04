// const db = require('../config/database');
// const bcrypt = require('bcryptjs');

// // Register a new user
// function registerUser(username, password, role, callback) {
//   bcrypt.hash(password, 10, (err, hashedPassword) => {
//     if (err) return callback(err);

//     const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
//     db.run(query, [username, hashedPassword, role], function (err) {
//       if (err) return callback(err);
//       callback(null, this.lastID);
//     });
//   });
// }

// // Find user by username
// function findUserByUsername(username, callback) {
//   const query = 'SELECT * FROM users WHERE username = ?';
//   db.get(query, [username], callback);
// }

// module.exports = { registerUser, findUserByUsername };
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user',
  },
});

module.exports = User;
