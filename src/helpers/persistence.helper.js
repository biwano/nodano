const mongoose = require('mongoose');
const config = require('../config.js');
const logger = require('./logger.helper');

let tt = 0;
const helpers = {
  connect: function connect() {
    this.connection = mongoose.createConnection(config.persistence.url);
    this.connection.on('error', logger.error);
    tt += 1;
    this.connection.tt = tt;
    return this.connection;
  },
};


module.exports = helpers;

