
const mongoose = require('mongoose');

const WalletTransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['Earning', 'Mint Fee', 'Tip', 'Ad Spend'], required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('WalletTransaction', WalletTransactionSchema);
