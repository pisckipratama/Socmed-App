const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const PostSchema = require('../models/Post');
const jwtAuth = require('../middleware/requireLogin');

router.post(
  '/',
  [
    check("title", "please insert the title").not().isEmpty(),
    check("body", "please insert the body of post").not().isEmpty(),
    check("pic", "please insert your photo").not().isEmpty()
  ],
  jwtAuth,
  async (req, res) => {
    const { title, body, pic } = req.body;
    const errors = validationResult(req);
    const errorMsg = errors.array();
    if (!errors.isEmpty()) return res.status(422).json({ success: false, code: 422, message: errorMsg[0].msg });

    try {
      const newPost = new PostSchema({ title, body, photo: pic, postedBy: req.user });
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
    const result = await PostSchema.find().sort({createdAt: -1}).populate('postedBy', '_id fullname');
    return res.status(200).json({ success: true, code: 201, message: "Retrive all data successfully.", data: result })
  } catch (err) {
    console.error(err.message);
    return res.send(err.message);
  }
});

router.get('/mypost', jwtAuth, async (req, res) => {
  try {
    const myPost = await PostSchema.find({ postedBy: req.user._id }).populate("postedBy", "_id fullname");
    return res.status(200).json({ success: true, code: 201, message: "Retrive all data successfully.", data: myPost });
  } catch (err) {
    console.error(err.message);
    return res.send(err.message);
  }
});

router.put('/like', jwtAuth, async (req, res) => {
  try {
    const result = await PostSchema.findByIdAndUpdate(req.body.postId, {
      $push: { likes: req.user._id }
    }, {
      new: true
    }).exec();
    return res.status(200).json({ success: true, code: 200, message: "Retrive likes successfully.", data: result })
  } catch (err) {
    console.error(err.message);
    return res.send(err.message);
  }
});

router.put('/unlike', jwtAuth, async (req, res) => {
  try {
    const result = await PostSchema.findByIdAndUpdate(req.body.postId, {
      $pull: { likes: req.user._id }
    }, {
      new: true
    }).exec();
    return res.status(200).json({ success: true, code: 200, message: "Retrive likes successfully.", data: result })
  } catch (err) {
    console.error(err.message);
    return res.send(err.message);
  }
});

module.exports = router;