function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const schemaBase = {
  created: Date,
  updated: Date,
};

module.exports = {
  ready: false,
  preSave(object_) {
    const object = object_;
    const date = new Date();
    if (object.isNew) {
      object.created = date;
    }
    object.updated = date;
  },
  model(definition_) {
    const definition = definition_;
    definition.assign(schemaBase);
    const schema = this.config.connection.Schema(definition);
    const __this = this;
    schema.pre('save', function presave(next) {
      __this.preSave(this);
      next();
    });
    console.log(this.config.connection.tt);
    return this.config.connection.model('User', schema);
  },
  initBE(config, path) {
    config.loadDirectoryFiles(path, '.model.js', (code_, relativePath, completePath) => {
      const code = capitalizeFirstLetter(code_);
      this.models[code] = require(completePath);
    });
  },
  init(config) {
    this.config = config;
    console.log('A');
    console.log(this.ready);
    if (!this.ready) {
      this.initBE(config, config.getNodanoPath('models'));
      this.initBE(config, config.getAppPath('models'));
      this.ready = true;
    }
    console.log('B');
    console.log(this.ready);
  },
  models: {},
};
