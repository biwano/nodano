const HandlebarsDirectory = require('handlebars-directory');


module.exports = {
  priority: 0,
  init(nodano) {
    const renderApp = HandlebarsDirectory(nodano.getAppPath('templates'), 'hbs');
    const renderNodano = HandlebarsDirectory(nodano.getNodanoPath('templates'), 'hbs');
    return {

      async render(template, payload) {
        return new Promise(async (resolve, reject) => {
          try {
            resolve(await renderApp(template, payload));
          } catch (e) {
            try {
              resolve(await renderNodano(template, payload));
            } catch (e2) {
              reject(e2);
            }
          }
        });
      },
    };
  },
};
