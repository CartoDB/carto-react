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
      }
    ]
  },
  plugins: [new ProgressPlugin()],
  entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'cartoForReact',
    libraryTarget: 'umd'
  }
};

module.exports = config;
