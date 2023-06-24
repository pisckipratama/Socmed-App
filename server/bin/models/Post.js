const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  likes: [{ type: ObjectId, ref: "User" }],
  photo: {
    type: String,
    required: true
  },
  postedBy: {
    type: ObjectId,
    ref: "User"
  }
});


module.exports = mongoose.model("Post", PostSchema);