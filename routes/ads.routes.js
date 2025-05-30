
const express = require('express');
const router = express.Router();
const adsController = require('../controllers/ads.controller');
const verifyToken = require('../middleware/auth.middleware');

// User routes
router.post('/', verifyToken, adsController.createAd);
router.get('/my', verifyToken, adsController.getMyAds);

// Admin routes
router.get('/', verifyToken, adsController.getAllAds);
router.patch('/:id/status', verifyToken, adsController.updateAdStatus);

module.exports = router;
