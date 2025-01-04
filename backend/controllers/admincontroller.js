const User = require('../models/userModel');

// Admin can update user
async function updateUser(req, res) {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }
  const { username, email } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
}

// Admin can delete user
async function deleteUser(req, res) {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }
  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed', error: error.message });
  }
}

// Admin can get all users
async function getAllUsers(req, res) {
  try {
    const users = await User.findAll();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Fetching users failed', error: error.message });
  }
}

module.exports = { updateUser, deleteUser, getAllUsers };
