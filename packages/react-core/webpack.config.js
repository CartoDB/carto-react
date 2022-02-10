const path = require('path');

// Path and filename of your result bundle.
// Webpack will bundle all JavaScript into this file
const webpackBaseConfig = require('../../webpack.base');

const webpackConfig = {
  ...webpackBaseConfig,
  // Be careful what you add as external because it can significantly affect the size of the worker package.
  externals: [/^@turf\/.+$/],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    library: 'cartoReactCore',
    libraryTarget: 'umd'
  }
};

module.exports = webpackConfig;
