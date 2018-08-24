const express = require('express');
const config = require('../config.js');

const router = express.Router();

// Returns application version
router.get('/version', (req, res) => {
  res.json({ version: config.version });
});
module.exports = router;
