module.exports = {
  type: String,
  name: String,
  email: String,
  auth: {
    login: String,
    password: String,
    salt: String,
    roles: [String],
  },
};
