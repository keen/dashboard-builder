const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const extendedPath = path.resolve(__dirname, 'dist');
let alias = {
  Client: path.resolve(__dirname, 'lib/')
};

let definePluginVars = {};

if (process.env.NODE_ENV === 'development') {
  const demoConfig = require('../demo-config');
  definePluginVars = {
    webpackKeenGlobals: JSON.stringify({ demoConfig })
  };
}

switch (process.env.NODE_ENV) {
  case 'production':
    switch (process.env.component) {
      case 'builder':
        entry = {
          main: './lib/index.js'
        };
        alias = {
          Client: path.resolve(__dirname, 'lib/')
        };
        name = 'main';
        break;
      case 'viewer':
        entry = {
          viewer: './lib/viewer/index.js'
        };
        alias = {
          Client: path.resolve(__dirname, 'lib/viewer/')
        };
        name = 'viewer';
        break;
      default:
        break;
    }
    break;

  case 'development':
    switch (process.env.component) {
      case 'builder':
        entry = './lib/builder/index.js';
        alias = {
          Client: path.resolve(__dirname, 'lib/builder/')
        };
        name = 'main';
        break;
      case 'viewer':
        entry = './lib/viewer/index.js';
        alias = {
          Client: path.resolve(__dirname, 'lib/viewer/')
        };
        name = 'viewer';
        break;

      default:
        entry = './lib/index.js';
        alias = {
          Client: path.resolve(__dirname, 'lib/')
        };
        name = 'main';
        break;
    }
    break;

  default:
    break;
}

module.exports = {
  entry,

  target: 'web',

  output: {
    path: extendedPath,
    filename: `${name}${process.env.OPTIMIZE_MINIMIZE ? '.min' : ''}.js`,
    library: `${!process.env.LIBRARY ? '' : process.env.LIBRARY}`,
    libraryTarget: 'umd'
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [path.resolve(__dirname, '')],
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: __dirname + '/postcss.config.js'
              }
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebPackPlugin({
      template:
        process.env.component === 'viewer'
          ? './test/demo/index-viewer.html'
          : './test/demo/index.html',
      filename: './index.html',
      title: 'Dashboard Builder'
    }),
    new webpack.DefinePlugin(definePluginVars)
  ],

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx'],
    alias
  },

  optimization: {
    minimize: !!process.env.OPTIMIZE_MINIMIZE
  },

  //devtool: 'source-map',

  context: __dirname,

  //stats: 'verbose',

  mode: process.env.NODE_ENV,

  devServer: {
    contentBase: path.join(__dirname, 'test/demo'),
    publicPath: '/',
    open: true,
    watchContentBase: true,
    historyApiFallback: true
  }
};
