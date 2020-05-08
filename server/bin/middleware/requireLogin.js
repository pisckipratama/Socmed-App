const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/key');

module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Unauthorize!");

  try {
    const decode = jwt.verify(token, JWT_SECRET);
    req.user = decode.user;
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: err.message });
  }
};