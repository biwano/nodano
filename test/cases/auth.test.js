/* global it */
const assert = require('assert');
const test = require('../../src/index.js').test;

let token;
module.exports = {
  description: () => {
    it('should get guest user information', async () => {
      const auth = await test.get('auth');
      assert.equal(auth.type, 'guest');
    });
    it('should request registration', async () => {
      token = await test.post('auth/request_registration', { email: 'a@a.com' });
      token = token.value;
      assert.equal(token.length > 50, true);
    });
    it('should check token', async () => {
      const result = await test.get(`auth/check_token/${token}`);
      assert.equal(result.login, 'a@a.com');
    });
    it('should register user', async () => {
      const result = await test.post('auth/register', {
        password: 'saussicedetoulouse',
        token,
      });
      assert.equal(result.status, 'ok');
    });
    it('should not register user twice', async () => {
      const result = await test.post('auth/register', {
        password: 'saussicedetoulouse',
        token,
      });
      assert.equal(result.status, 'ko');
    });
    it('should get connected user information', async () => {
      const auth = await test.get('auth');
      assert.equal(auth.type, 'registered');
      assert.equal(auth.login, 'a@a.com');
      assert.equal(auth.name, 'a@a.com');
    });
    it('should update user information', async () => {
      const result = await test.post('auth', { name: 'Jane Doe' });
      assert.equal(result.status, 'ok');
    });
    it('should get updated user information', async () => {
      const auth = await test.get('auth');
      assert.equal(auth.name, 'Jane Doe');
    });
  },
  async init(nodano) {
    await nodano.model.User.deleteMany({});
  },
};
