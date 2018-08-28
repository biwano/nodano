const mongoose = require('mongoose');

const init = function init(nodano_) {
  const nodano = nodano_;
  const connection = mongoose.createConnection(nodano.config.persistence.url);
  connection.on('error', nodano.logger.error);
  nodano.connection = connection;
  return { connection,
  	destroy() {
  		this.connection.close();
  	},
  };
};


module.exports = { priority: 10, init };

