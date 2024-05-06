const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/constants');
const userService = require('../services/userService');
const HTTP_STATUS = require("../utils/httpStatus");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (username && password) {
      const user = await userService.authenticate(username, password);

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
        .json({ status: "error", message: "Invalid username & Password" });
    }
  } catch (err) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};
