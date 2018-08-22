const path = require('path');
const fs = require('fs');

module.exports = {
  init(configPath) {
    const config = require(configPath);
    Object.assign(this, config);
    this.basePath = path.dirname(configPath);
    this.templatesPath = path.join(this.basePath, 'templates');
    this.modelsPath = path.join(this.basePath, 'models');
    this.routesPath = path.join(this.basePath, 'routes');
    this.helpersPath = path.join(__dirname, 'helpers');
  },
  loadDirectoryFiles(rootPath, extension, callback) {
    const files = fs.readdirSync(rootPath);
    for (let i = 0; i < files.length; i += 1) {
      const relativePath = files[i];
      const code = path.basename(relativePath, extension);
      const completePath = path.join(rootPath, relativePath);
      callback(code, relativePath, completePath);
    }
  },
};
