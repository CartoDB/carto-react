const path = require('path');
const { ProgressPlugin } = require('webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const mode = process.env.NODE_ENV || 'development';

// This is main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = {
  // Default mode for Webpack is production.
  // Depending on mode Webpack will apply different things
  // on final bundle.
  mode,
  devtool: mode === 'development' ? 'eval-source-map' : 'source-map',
  entry: './src/index.ts',
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/(node_modules)/, /(dist)/],
        loader: 'babel-loader'
      },
      {
        test: /\.tsx?$/,
        exclude: [/(node_modules)/, /(dist)/],
        use: 'ts-loader'
      }
    ]
  },
  plugins: [
    new ProgressPlugin()
    // Uncomment for bundle analysis
    // new BundleAnalyzerPlugin()
  ]
};
