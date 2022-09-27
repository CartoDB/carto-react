const base = require('../../jest.config.base');

module.exports = {
  ...base,
  transformIgnorePatterns: ['node_modules/(?!(@mapbox/tiny-sdf|mapbox-gl)/)']
};
