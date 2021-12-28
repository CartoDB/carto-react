const path = require('path');

// Path and filename of your result bundle.
// Webpack will bundle all JavaScript into this file
const webpackBaseConfig = require('../../webpack.base');

const webpackConfig = {
  ...webpackBaseConfig,
  externals: [
    /^@carto\/react-.+$/,
    /^@material-ui\/.+$/,
    /^@nebula.gl\/.+$/,
    'react',
    'react-dom',
    'react-redux',
    'redux'
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    library: 'cartoReactWidgets',
    libraryTarget: 'umd'
  }
};

module.exports = webpackConfig;
