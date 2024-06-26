const User = require('../models/User');
const bcrypt = require('bcrypt');

// Authenticate user
exports.authenticate = async (email, password) => {
  // Find user by email
  const user = await User.findOne({ email });

  if (!user) {
    return null; // User not found
  }

  // Validate password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return null; // Incorrect password
  }

  return user; // Authentication successful
};

// Create user
exports.createUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    throw new Error('Error creating user');
  }
};
