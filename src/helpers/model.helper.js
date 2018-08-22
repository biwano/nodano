function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
  preSave(object_) {
    const object = object_;
    const date = new Date();
    if (object.isNew) {
      object.created = date;
    }
    object.updated = date;
  },
  init(config) {
    config.loadDirectoryFiles(config.modelsPath, '.model.js', (code_, relativePath, completePath) => {
      const code = capitalizeFirstLetter(code_);
      this.models[code] = require(completePath);
    });
  },
  models: {},
};
