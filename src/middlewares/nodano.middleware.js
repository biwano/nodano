const bodyParser = require('body-parser');
const express = require('express');

const router = express.Router();
function init(nodano) {
  router.use(bodyParser.json());
  router.use(async (req, res, next) => {
    res.nodano = nodano;
    res.config = nodano.config;
    res.M = nodano.model;
    res.Mailer = nodano.mail;
    res.Logger = nodano.logger;
    next();
  });

  return router;
}
function destroy() {}

module.exports = { priority: 100, init, destroy };

