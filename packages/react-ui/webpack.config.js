const path = require('path');

// Path and filename of your result bundle.
// Webpack will bundle all JavaScript into this file
const webpackBaseConfig = require('../../webpack.base');

const webpackConfig = {
  ...webpackBaseConfig,
  externals: [
    '@carto/react-core',
    /^@mui\/.+$/,
    /^@emotion\/.+$/,
    'styled-components',
    'echarts',
    'echarts-for-react',
    'react',
    'react-dom'
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    library: 'cartoReactUi',
    libraryTarget: 'umd'
  }
};

module.exports = webpackConfig;
