
const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  group: { type: String, required: true },
  joined: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Member', MemberSchema);
