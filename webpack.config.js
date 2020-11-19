const path = require('path');

const config = {
  mode: 'development',
  entry: './src/index.js',
  // output: {
  //   path: path.resolve(__dirname, 'dist'),
  //   filename: 'carto-react.js',
  //   library: 'cartoForReact',
  //   libraryTarget: 'umd'
  // },
  externals: [
    {
      react: 'react',
      'react-redux': 'react-redux',
      'react-dom': 'react-dom',      
      '@reduxjs/toolkit': '@reduxjs/toolkit',
      '@deck.gl/core': '@deck.gl/core',
      '@deck.gl/google-maps': '@deck.gl/google-maps',
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

const api = {...config, 
  output: {
    path: path.resolve(__dirname, 'dist', 'api'),
    filename: 'index.js',
    library: 'cartoForReact',
    libraryTarget: 'umd'
  }, 
  entry: './src/api/index.js',
};

const basemaps = {...config, 
  output: {
    path: path.resolve(__dirname, 'dist', 'basemaps'),
    filename: 'index.js',
    library: 'cartoForReact',
    libraryTarget: 'umd'
  }, 
  entry: './src/basemaps/index.js',
};

const oauth = {...config, 
  output: {
    path: path.resolve(__dirname, 'dist', 'oauth'),
    filename: 'index.js',
    library: 'cartoForReact',
    libraryTarget: 'umd'
  }, 
  entry: './src/oauth/index.js',
};

const redux = {...config, 
  output: {
    path: path.resolve(__dirname, 'dist', 'redux'),
    filename: 'index.js',
    library: 'cartoForReact',
    libraryTarget: 'umd'
  }, 
  entry: './src/redux/index.js',
};

const ui = {...config, 
  output: {
    path: path.resolve(__dirname, 'dist', 'ui'),
    filename: 'index.js',
    library: 'cartoForReact',
    libraryTarget: 'umd'
  }, 
  entry: './src/ui/index.js',
};

const widgets = {...config, 
  output: {
    path: path.resolve(__dirname, 'dist', 'widgets'),
    filename: 'index.js',
    library: 'cartoForReact',
    libraryTarget: 'umd'
  }, 
  entry: './src/widgets/index.js',
};

module.exports = [ api, basemaps, oauth, redux, ui, widgets]