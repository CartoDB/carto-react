const path = require('path');

// Path and filename of your result bundle.
// Webpack will bundle all JavaScript into this file
const webpackBaseConfig = require('../../webpack.base');

const webpackConfig = {
  ...webpackBaseConfig,
  externals: [
    'react', 
    'react-dom',
  ],
  output: {
    publicPath: '',
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    library: 'cartoReactWorkers',
    libraryTarget: 'umd'
  }
};

webpackConfig.module.rules.push(
  {
    test: /\.worker\.js$/,
    exclude: /(node_modules)/,
    loader: 'worker-loader',
    options: {
      inline: 'fallback'
    }
  }
)

module.exports = webpackConfig;
