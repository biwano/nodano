const mongoose = require('mongoose');
const config = require('../config.js');
const logger = require('./logger.helper');

const helpers = {
  connect: function connect() {
    mongoose.connect(config.persistence.url);
    this.connection = mongoose.connection;
    this.connection.on('error', logger.error);
    return this.connection;
  },
};


module.exports = helpers;

