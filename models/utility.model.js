
const mongoose = require('mongoose');

const UtilityTransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceType: { type: String, enum: ['airtime', 'bills', 'shop'], required: true },
  phone: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('UtilityTransaction', UtilityTransactionSchema);
