/* global after, it, describe */
const { appPromise, server } = require('../index.js');
const auth = require('./auth.test.js');

let nodano;
describe('App', () => {
  it('should be configured', async () => {
    nodano = await appPromise;
    auth.init(nodano);
  });

  describe('Auth', auth.description);
});
after(() => {
  server.close();
  nodano.destroy();
  console.log('done');
});
