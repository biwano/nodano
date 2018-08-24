/* global after, it, describe */
const assert = require('assert');
const { appPromise, server } = require('../index.js');

let globals;
describe('App', () => {
  it('should be configured', async () => {
    globals = await appPromise;
    // console.log(globals.app);
    // assert.strictEqual(config.version, '1.0');
  });
  describe('Auth', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
after(() => {
  server.close();
  console.log('done');
});
