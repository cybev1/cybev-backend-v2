
const Member = require('../models/cms.model');

exports.addMember = async (req, res) => {
  try {
    const member = new Member({ ...req.body, userId: req.user.id });
    await member.save();
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add member', error });
  }
};

exports.getMyMembers = async (req, res) => {
  try {
    const members = await Member.find({ userId: req.user.id }).sort({ joined: -1 });
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch members', error });
  }
};
