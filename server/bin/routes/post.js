const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const PostSchema = require('../models/Post');
const jwtAuth = require('../middleware/requireLogin');

router.post(
  '/',
  [
    check("title", "please insert the title").not().isEmpty(),
    check("body", "please insert the body of post").not().isEmpty()
  ],
  jwtAuth,
  async (req, res) => {
    const { title, body } = req.body;
    const errors = validationResult(req);
    const errorMsg = errors.array();
    if (!errors.isEmpty()) return res.status(422).json({ success: false, code: 422, message: errorMsg[0].msg });

    try {
      console.log(req.user);
      const newPost = new PostSchema({ title, body, postedBy: req.user });
      const sendPost = await newPost.save();
      return res.status(201).json({ success: true, code: 201, data: sendPost, message: "Post created successfully." });
    } catch (err) {
      console.error(err.message);
      return res.send(err.message);
    };
  }
);

router.get('/', jwtAuth, async (req, res) => {
  try {
    const result = await PostSchema.find().populate('postedBy', '_id fullname');
    res.status(200).json({ success: true, code: 201,  message: "Retrive all data successfully.", data: result })
  } catch (err) {
    console.error(err.message);
    return res.send(err.message);
  }
});

module.exports = router;