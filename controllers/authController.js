const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/constants');
const userService = require('../services/userService');
const HTTP_STATUS = require("../utils/httpStatus");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      const user = await userService.authenticate(email, password);

      if (!user) {
        return res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .json({ status: "error", message: "Invalid credentials" });
      }

      const payload = {
        user: {
          id: user.id,
          isAdmin: user.isAdmin,
        },
      };

      jwt.sign(payload, JWT_SECRET, { expiresIn: "4h" }, (err, token) => {
        if (err) throw err;
        res.json({ status: "success", token });
      });
    } else {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ status: "error", message: "Invalid email & Password" });
    }
  } catch (err) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};
