// const path = require('path');
const config = require('./webpack.config.js');

for (const c of config) {
  c.mode = 'production';
}

module.exports = config;
