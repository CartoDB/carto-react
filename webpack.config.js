const path = require('path');
const { ProgressPlugin } = require('webpack');

const FOLDERS = ['api', 'basemaps', 'oauth', 'redux', 'ui', 'widgets'];
const entry = Object.fromEntries(FOLDERS.map((f) => [f, `./src/${f}/index.js`]));

const pkg = require('./package.json');
const externals = [/^@material-ui\/.+$/];
for (const depName in pkg.peerDependencies) {
  if (!depName.startsWith('@material-ui')) {
    externals.push(depName);
  }
}

const config = {
  mode: 'development',
  devtool: 'eval-source-map',
  externals,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      },
      {
        test: /\.worker\.js$/,
        exclude: /(node_modules)/,
        loader: 'worker-loader',
        options: {
          inline: 'fallback'
        }
      }
    ]
  },
  plugins: [new ProgressPlugin()],
  entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'cartoForReact',
    libraryTarget: 'umd',
    globalObject: 'this'
  }
};

module.exports = config;
