const bodyParser = require('body-parser');
const config = require('./config.js');

const persistenceHelper = require('./helpers/persistence.helper.js');
const modelHelper = require('./helpers/model.helper.js');
const loggerMiddleware = require('./middlewares/logger.middleware.js');
const modelMiddleware = require('./middlewares/model.middleware.js');
const authMiddleware = require('./middlewares/auth.middleware.js');
const mailMiddleware = require('./middlewares/mail.middleware.js');
const responseMiddleware = require('./middlewares/response.middleware.js');

module.exports = {
  configure(app, configPath, callback) {
    // Initializing config
    config.init(configPath);

    // Initializing helpers
    config.loadDirectoryFiles(config.helpersPath, '.helper.js', (code, relativePath, completePath) => {
      const helper = require(completePath);
      if (helper.init !== undefined) helper.init(config);
    });

    // Connecting database
    const connection = persistenceHelper.connect();
    connection.once('open', () => {
      // Loading middlewares
      app.use(bodyParser.json());
      app.use(loggerMiddleware);
      app.use(responseMiddleware);
      app.use(modelMiddleware);
      app.use(mailMiddleware);
      app.use(authMiddleware(connection));

      // Loading routes
      config.loadDirectoryFiles(config.routesPath, '.route.js', (code, relativePath, completePath) => {
        app.use(`/api/${code}`, require(completePath));
      });

      if (callback !== undefined) callback(app);
    });
  },
  preSave: modelHelper.preSave,
};
