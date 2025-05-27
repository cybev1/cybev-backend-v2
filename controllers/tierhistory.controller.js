const BadgeMint = require('../models/badgeMint.model');

exports.getBadgeHistory = async (req, res) => {
  try {
    const history = await BadgeMint.find({ userId: req.userId }).sort({ mintedAt: -1 });
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};