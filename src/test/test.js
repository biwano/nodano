const axios = require('axios');
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');

const jar = new tough.CookieJar();
const http = axios.create({ baseURL: 'http://localhost:3000/api/', withCredentials: true, jar });
axiosCookieJarSupport(http);

module.exports = {
  request(method, url, body_) {
    const body = Object.assign({ method }, { data: body_ || {} });
    return http(url, body)
      .then(response => response.data);
  },
  get(url) {
    return this.request('get', url);
  },
  put(url, body) {
    return this.request('put', url, body);
  },
  post(url, body) {
    return this.request('post', url, body);
  },
  delete(url) {
    return this.request('delete', url);
  },
};
