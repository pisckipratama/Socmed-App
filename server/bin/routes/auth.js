const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const UserSchema = require('../models/User');

router.post('/signup',
  [
    check("email", "Email is not valid.").isEmail(),
    check("fullname", "Fullname is not empty.").not().isEmpty(),
    check("password", "Password min 6 characters.").isLength({ min: 6 })
  ],
  async (req, res) => {
    const { email, fullname, password } = req.body;
    const errors = validationResult(req);
    const errorMsg = errors.array();
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, code: 422, message: errorMsg[0].msg });
    }

    try {
      const user = await UserSchema.findOne({ email });
      if (user) {
        return res.status(400).json({ success: false, code: 400, message: "user already exits" });
      };

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const newUser = new UserSchema({ email, fullname, password: hash });
      const result = await newUser.save();
      return res.status(201).json({ success: true, code: 201, data: result, message: "Register user successfully." });
    } catch (err) {
      console.error(err.message);
      return res.send(err.message);
    }
  }
);

router.post('/login',
  [
    check("email", "Email is not valid.").isEmail().not().isEmpty(),
    check("password", "Password min 6 characters.").isLength({ min: 6 }).not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const errorMsg = errors.array();
    if (!errors.isEmpty()) return res.status(422).json({ success: false, code: 422, message: errorMsg[0].msg });

    const { email, password } = req.body;
    try {
      const user = await UserSchema.findOne({ email });
      if (!user) return res.status(400).json({ success: false, code: 400, message: `User with email ${email} not found.` });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ success: false, code: 400, message: "Password incorrect!" });
      res.status(200).json({ success: true, code: 200, message: "login successfully" });

    } catch (err) {
      console.error(err.message);
      return res.send(err.message);
    }
  }
)

module.exports = router;