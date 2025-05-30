
const NFT = require('../models/nft.model');

exports.mintNFT = async (req, res) => {
  try {
    const nft = new NFT({ ...req.body, userId: req.user.id });
    await nft.save();
    res.status(201).json(nft);
  } catch (error) {
    res.status(500).json({ message: 'Minting failed', error });
  }
};

exports.getMyNFTs = async (req, res) => {
  try {
    const nfts = await NFT.find({ userId: req.user.id });
    res.status(200).json(nfts);
  } catch (error) {
    res.status(500).json({ message: 'Fetching NFTs failed', error });
  }
};
