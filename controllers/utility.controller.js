
const UtilityTransaction = require('../models/utility.model');

exports.createTransaction = async (req, res) => {
  try {
    const tx = new UtilityTransaction({ ...req.body, userId: req.user.id });
    await tx.save();
    res.status(201).json(tx);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create utility transaction', error });
  }
};

exports.getMyTransactions = async (req, res) => {
  try {
    const txs = await UtilityTransaction.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(txs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch utility transactions', error });
  }
};
