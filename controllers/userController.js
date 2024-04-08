const bcrypt = require('bcrypt');
const User = require('../models/User');
const HTTP_STATUS = require('../utils/httpStatus');

exports.createUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ username });

    if (user) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ status: 'error', message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    user = new User({
      username,
      password: hashedPassword
    });

    await user.save();

    res.status(HTTP_STATUS.CREATED).json({ status: 'success', message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ status: 'error', message: 'Server error' });
  }
};
