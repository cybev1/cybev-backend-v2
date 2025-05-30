
const Ad = require('../models/ads.model');

exports.createAd = async (req, res) => {
  try {
    const ad = new Ad({ ...req.body, userId: req.user.id });
    await ad.save();
    res.status(201).json(ad);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create ad', error });
  }
};

exports.getMyAds = async (req, res) => {
  try {
    const ads = await Ad.find({ userId: req.user.id });
    res.status(200).json(ads);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve ads', error });
  }
};

exports.getAllAds = async (req, res) => {
  try {
    const ads = await Ad.find().populate('userId', 'username email');
    res.status(200).json(ads);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve all ads', error });
  }
};

exports.updateAdStatus = async (req, res) => {
  try {
    const ad = await Ad.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.status(200).json(ad);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update ad status', error });
  }
};
