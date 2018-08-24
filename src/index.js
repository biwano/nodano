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
  configure(app, configPath) {
    return new Promise(((resolve) => {
      // Initializing config
      config.init(configPath);

      // Initializing helpers
      config.loadDirectoryFiles(config.getNodanoPath('helpers'), '.helper.js',
        (code, relativePath, completePath) => {
          const helper = require(completePath);
          if (helper.init !== undefined) helper.init(config);
        });

      // Connecting database
      config.connection = persistenceHelper.connect();
      config.connection.once('open', () => {
        // Loading middlewares
        app.use(bodyParser.json());
        app.use(loggerMiddleware);
        app.use(responseMiddleware);
        app.use(modelMiddleware);
        app.use(mailMiddleware);
        app.use(authMiddleware(config.connection));

        const initRoutes = function initRoutes(path) {
          config.loadDirectoryFiles(path, '.route.js', (code, relativePath, completePath) => {
            app.use(`/api/${code}`, require(completePath));
          });
        };
        // Loading routes
        initRoutes(config.getNodanoPath('routes'));
        initRoutes(config.getAppPath('routes'));

        resolve({ app, config });
      });
    }));
  },
  model: modelHelper.model,
};
