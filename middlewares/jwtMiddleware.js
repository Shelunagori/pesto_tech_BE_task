const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/constants');

const jwtMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  console.log(token);
  if (!token) {
    return res.status(401).json({status : "error", message: 'Authorization denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET); 
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ status : "error", message: 'Invalid token.' });
  }
};

module.exports = jwtMiddleware;
