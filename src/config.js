const path = require('path');
const fs = require('fs');

module.exports = {
  init(configPath) {
    const config = require(configPath);
    Object.assign(this, config);
    this.appPath = path.dirname(configPath);
    this.nodanoPath = __dirname;
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
  getAppPath(subPath) {
    return path.join(this.appPath, subPath);
  },
  getNodanoPath(subPath) {
    return path.join(this.nodanoPath, subPath);
  },
};
