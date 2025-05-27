const Stake = require('../models/stake.model');

function getTier(staked) {
  if (staked >= 1000) return '💎 Diamond';
  if (staked >= 500) return '🥇 Gold';
  if (staked >= 100) return '🥈 Silver';
  return '🥉 Bronze';
}

exports.mintBadge = async (req, res) => {
  try {
    const stakes = await Stake.find({ userId: req.userId });
    const total = stakes.reduce((sum, s) => sum + s.amount, 0);
    const tier = getTier(total);

    res.status(200).json({
      message: 'Badge minted successfully (mock)',
      tier,
      metadata: {
        title: `${tier} Tier Badge`,
        description: `Awarded for staking ₡${total} on CYBEV`,
        image: `/badges/${tier.replace(/[^a-zA-Z]/g, '').toLowerCase()}.png`
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};