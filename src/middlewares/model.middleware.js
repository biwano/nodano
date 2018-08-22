const express = require('express');
const helper = require('../helpers/model.helper');

const router = express.Router();

router.use((req, res, next) => {
  res.M = helper.models;
  next();
});

module.exports = router;

