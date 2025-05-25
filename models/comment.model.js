const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  name: { type: String, default: 'Guest' },
  text: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);