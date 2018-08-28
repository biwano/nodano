const mongoose = require('mongoose');

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const schemaBase = {
  created: Date,
  updated: Date,
};
function saveTimeStamps(object_) {
  const object = object_;
  const date = new Date();
  if (object.isNew) {
    object.created = date;
  }
  object.updated = date;
}
function model(connection, code, definition_) {
  const definition = definition_;
  Object.assign(definition, schemaBase);
  const schema = mongoose.Schema(definition);
  schema.pre('save', function presave(next) {
    saveTimeStamps(this);
    next();
  });
  return connection.model(code, schema);
}

module.exports = { priority: 0,
  init(nodano) {
    const models = {};
    nodano.loadDirectoryFiles('models', '.model.js', (code_, relativePath, completePath) => {
      const code = capitalizeFirstLetter(code_);
      models[code] = model(nodano.connection, code, require(completePath));
    });

    return models;
  },
};
