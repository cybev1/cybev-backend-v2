
const express = require('express');
const router = express.Router();
const nftController = require('../controllers/nft.controller');
const verifyToken = require('../middleware/auth.middleware');

router.post('/', verifyToken, nftController.mintNFT);
router.get('/my', verifyToken, nftController.getMyNFTs);

module.exports = router;
