const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'carto-react.js',
    library: 'cartoForReact',
    libraryTarget: 'umd'
  },
  externals: [
    {
      react: 'react',
      'react-redux': 'react-redux',
      'react-dom': 'react-dom',
      '@reduxjs/toolkit': '@reduxjs/toolkit'
    },
    /^@material-ui\/.+$/,
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
     }
    ]
  }
};
