const express = require('express'); 
const { createStake, getUserStakes } = require('../controllers/stake.controller');
const auth = require('../middleware/auth.middleware'); // ✅ Protects the route
const router = express.Router();

// ✅ Require login to access stake routes
router.post('/stakes', auth, createStake);
router.get('/stakes/user', auth, getUserStakes);

module.exports = router;
