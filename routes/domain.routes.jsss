const express = require('express');
const router = express.Router();

// Simulated domain availability checker
router.get('/check-domain', async (req, res) => {
  const { domain } = req.query;

  if (!domain) {
    return res.status(400).json({ message: 'Domain required' });
  }

  const isAvailable = Math.random() > 0.5;
  res.json({
    domain,
    available: isAvailable,
    status: isAvailable ? 'available' : 'taken'
  });
});

module.exports = router;
