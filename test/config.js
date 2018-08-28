module.exports = {
  version: '1.0',
  client_url: 'http://localhost:8080/#',
  token_secret: 'this is a secret!',
  persistence: {
    url: 'mongodb://localhost:27017/test',
  },
  mail: {
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '9b64899bd755d7',
      pass: 'e1a9ad146e8e7b',
    },
    from: 'no-reply@test.com',
  },
  debug: true,
};
