
const User = require("../models/user.model");

exports.updateOnboarding = async (req, res) => {
  try {
    const userId = req.user.id;
    const { features, interests, bio, profileImage } = req.body;

    const updateFields = {
      features,
      interests,
      bio,
      profileImage,
    };

    await User.findByIdAndUpdate(userId, updateFields);
    res.status(200).json({ message: "Onboarding completed successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to update onboarding.", error });
  }
};
