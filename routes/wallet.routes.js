
const express = require('express');
const router = express.Router();
const walletController = require('../controllers/wallet.controller');
const verifyToken = require('../middleware/auth.middleware');

router.get('/my', verifyToken, walletController.getMyWallet);
router.post('/', verifyToken, walletController.addTransaction);

module.exports = router;
