
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String },
  niche: { type: String },
  tags: [{ type: String }],
  status: { type: String, enum: ['draft', 'published', 'scheduled'], default: 'published' },
  scheduledAt: { type: Date },
  isMinted: { type: Boolean, default: false },
  boosted: { type: Boolean, default: false },
  pinned: { type: Boolean, default: false },
  shareToTimeline: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
