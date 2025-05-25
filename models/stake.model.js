const mongoose = require('mongoose');

const stakeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  duration: { type: Number, required: true }, // in days
  reward: { type: Number },
  unlockDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Stake', stakeSchema);