const HandlebarsDirectory = require('handlebars-directory');


module.exports = {
  init(config) {
    this.render = HandlebarsDirectory(config.getAppPath('templates'), 'hbs');
  },
};
