const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/constants');
const userService = require('../services/userService');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userService.authenticate(username, password);
    
    if (!user) {
      return res.status(401).json({ status : "error", message: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        isAdmin: user.isAdmin,
      },
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: "4h" }, (err, token) => {
      if (err) throw err;
      res.json({ status : "success", token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
