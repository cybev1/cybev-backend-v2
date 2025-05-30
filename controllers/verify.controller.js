
const User = require('../models/user.model');

exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  if (!token) return res.status(400).json({ message: 'Missing token' });

  try {
    const user = await User.findOne({ emailToken: token });

    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    user.isVerified = true;
    user.emailToken = null;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Verification failed' });
  }
};
