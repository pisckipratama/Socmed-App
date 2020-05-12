const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/key');

module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  // res.status(401).send("Unauthorize!");
  if (!token) return res.status(401).json({ success: false, code: 401, message: "You must be logged in!" });

  try {
    const decode = jwt.verify(token, JWT_SECRET);
    req.user = decode.user;
    next();
  } catch (err) {
    console.error(err.message);
    // res.status(500).json({ message: err.message });
    return res.status(500).json({ success: false, code: 500, message: err.message });
  }
};