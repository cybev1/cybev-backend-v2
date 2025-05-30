
const express = require('express');
const router = express.Router();
const utilityController = require('../controllers/utility.controller');
const verifyToken = require('../middleware/auth.middleware');

router.post('/', verifyToken, utilityController.createTransaction);
router.get('/my', verifyToken, utilityController.getMyTransactions);

module.exports = router;
