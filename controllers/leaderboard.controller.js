const Stake = require('../models/stake.model');
const User = require('../models/user.model');

exports.getTopStakers = async (req, res) => {
  try {
    const stakes = await Stake.aggregate([
      {
        $group: {
          _id: "$userId",
          totalStaked: { $sum: "$amount" }
        }
      },
      { $sort: { totalStaked: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: {
          username: "$user.username",
          totalStaked: 1
        }
      }
    ]);

    const total = await Stake.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    res.json({ top: stakes, totalStaked: total[0]?.total || 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};