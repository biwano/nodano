const persistenceHelper = require('./helpers/persistence.helper.js');
const path = require('path');
const fs = require('fs');

const nodanoFuncs = {
  getDirectives(rootPath, extension) {
    const directives = [];
    if (fs.existsSync(rootPath)) {
      const files = fs.readdirSync(rootPath);

      for (let i = 0; i < files.length; i += 1) {
        const relativePath = files[i];
        const code = path.basename(relativePath, extension);
        const completePath = path.join(rootPath, relativePath);
        const priority = require(completePath).priority;
        directives.push({ priority, code, relativePath, completePath });
      }
    } else this.debug(`Cannot scan ${rootPath}`);
    return directives;
  },
  loadDirectoryFiles(rootPath, extension, callback) {
    let nodanoDirectives = this.getDirectives(this.getAppPath(rootPath), extension);
    const appDirectives = this.getDirectives(this.getNodanoPath(rootPath), extension);
    nodanoDirectives = nodanoDirectives.filter(
      nodanoDirective => appDirectives.filter(
        appDirective => appDirective.code === nodanoDirective.code).length === 0,
    );


    const directives = nodanoDirectives.concat(appDirectives);
    directives.sort((a, b) => a.priority < b.priority);
    for (let i = 0; i < directives.length; i += 1) {
      const directive = directives[i];
      this.debug(`Initializing ${rootPath}/${directive.code}`);
      callback(directive.code, directive.relativePath, directive.completePath);
    }
  },
  getAppPath(subPath) {
    return path.join(this.appPath, subPath);
  },
  getNodanoPath(subPath) {
    return path.join(this.nodanoPath, subPath);
  },
  debug(text) {
    if (this.logger) this.logger.debug(text);
    else console.log(text);
  },
  init(app, configPath) {
    const config = require(configPath);
    this.config = {};
    Object.assign(this.config, config);
    this.app = app;
    this.appPath = path.dirname(configPath);
    this.nodanoPath = __dirname;
    // Initializing helpers
    this.helpers = {};
    this.loadDirectoryFiles('helpers', '.helper.js',
      (code, relativePath, completePath) => {
        this[code] = require(completePath).init(this);
        this.helpers[code] = this[code];
      });
  },
  destroy() {
    // Destroying helpers
    const keys = Object.keys(this.helpers);
    for (let i = 0; i < keys.length; i += 1) {
      this.debug(`Destroying helper ${keys[i]}`);
      const helper = this.helpers[keys[i]];
      if (helper.destroy !== undefined) helper.destroy(this);
    }
  },
};
module.exports = {
  init(app, configPath) {
    const nodano = Object.assign({}, nodanoFuncs);

    nodano.init(app, configPath);

    return nodano;
  },

};
