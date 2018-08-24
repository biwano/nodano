const express = require('express');
const path = require('path');

const nodano = require('../src/index.js');


const app = express();

const appPromise = nodano.configure(app, path.join(__dirname, 'config.js'));

const server = app.listen(3000);

module.exports = { server, appPromise };
