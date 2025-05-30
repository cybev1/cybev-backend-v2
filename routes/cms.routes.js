
const express = require('express');
const router = express.Router();
const cmsController = require('../controllers/cms.controller');
const verifyToken = require('../middleware/auth.middleware');

router.post('/', verifyToken, cmsController.addMember);
router.get('/my', verifyToken, cmsController.getMyMembers);

module.exports = router;
