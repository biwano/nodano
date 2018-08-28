const nodanoModule = require('./nodano.js');

const test = require('./test/test.js');

module.exports = {
  configure(app, configPath) {
    return new Promise(((resolve) => {
      // Initializing nodano instance
      const nodano = nodanoModule.init(app, configPath);

      nodano.connection.once('open', () => {
        // Loading middlewares
        nodano.loadDirectoryFiles('middlewares', '.middleware.js', (code, relativePath, completePath) => {
          app.use(require(completePath).init(nodano));
        });
        // Loading routes
        nodano.loadDirectoryFiles('routes', '.route.js', (code, relativePath, completePath) => {
          app.use(`/api/${code}`, require(completePath));
        });

        resolve(nodano);
      });
    }));
  },
  test,

};
