const Stake = require('../models/stake.model');
const BadgeMint = require('../models/badgeMint.model');

function getTier(staked) {
  if (staked >= 1000) return '💎 Diamond';
  if (staked >= 500) return '🥇 Gold';
  if (staked >= 100) return '🥈 Silver';
  return '🥉 Bronze';
}

function getImageUrl(tier) {
  const name = tier.replace(/[^a-zA-Z]/g, '').toLowerCase();
  return `https://cdn.cybev.io/badges/${name}.png`;
}

exports.mintBadge = async (req, res) => {
  try {
    const stakes = await Stake.find({ userId: req.userId });
    const total = stakes.reduce((sum, s) => sum + s.amount, 0);
    const tier = getTier(total);

    const alreadyMinted = await BadgeMint.findOne({ userId: req.userId, tier });
    if (alreadyMinted) return res.status(409).json({ message: 'Badge already minted' });

    await BadgeMint.create({ userId: req.userId, tier });

    res.status(200).json({
      message: 'Badge minted successfully',
      tier,
      metadata: {
        title: `${tier} Tier Badge`,
        description: `Awarded for staking ₡${total} on CYBEV`,
        image: getImageUrl(tier)
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};