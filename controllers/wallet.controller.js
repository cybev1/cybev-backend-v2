
const WalletTransaction = require('../models/wallet.model');

exports.getMyWallet = async (req, res) => {
  try {
    const transactions = await WalletTransaction.find({ userId: req.user.id }).sort({ date: -1 });
    const balance = transactions.reduce((sum, tx) => sum + tx.amount, 0);
    res.status(200).json({ balance, transactions });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load wallet', error });
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const tx = new WalletTransaction({ ...req.body, userId: req.user.id });
    await tx.save();
    res.status(201).json(tx);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save transaction', error });
  }
};
