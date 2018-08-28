/* global after, it, describe */
const assert = require('assert');
const { appPromise, server } = require('../index.js');
const test = require('../../src/index.js').test;

let nodano;
describe('App', () => {
  it('should be configured', async () => {
    nodano = await appPromise;
    // console.log(globals.app);
    // assert.strictEqual(config.version, '1.0');
  });
  describe('Auth', () => {
    it('should get guest user information', async () => {
      const auth = await test.get('auth');
      assert.equal(auth.type, 'guest');
    });
    it('should request registration', async () => {
      const token = await test.post('auth/request_registration', { email: 'a@a.com' });
      console.log(token);
      assert.equal(token.value.length > 50, true);
    });
  });
});
after(() => {
  server.close();
  nodano.destroy();
  console.log('done');
});
