const Stake = require('../models/stake.model');

exports.createStake = async (req, res) => {
  try {
    const { amount, duration } = req.body;
    const rewardRates = { 30: 5, 60: 12, 90: 20 };
    const reward = (parseFloat(amount) * rewardRates[duration]) / 100;
    const unlockDate = new Date(Date.now() + duration * 86400000);

    const stake = await Stake.create({
      userId: req.userId,
      amount,
      duration,
      reward,
      unlockDate
    });

    res.status(201).json(stake);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserStakes = async (req, res) => {
  try {
    const stakes = await Stake.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(stakes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};