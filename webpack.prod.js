const config = require('./webpack.config.js');

config.mode = 'production';
config.devtool = 'source-map';

module.exports = config;
