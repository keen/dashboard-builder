const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const extendedPath = path.resolve(__dirname, 'dist');

switch (process.env.NODE_ENV) {
  case 'production':
    entry = {
      main: './lib/builder/index.js',
      viewer:  './lib/viewer/index.js'
    }
    break;

  case 'development':
    switch (process.env.component) {
      case 'builder':
        entry = './lib/builder/index.js';
        break;
      case 'viewer':
        entry = './lib/viewer/index.js';
        break;
    
      default:
        entry = './lib/index.js';
        break;
    }
    break;

  default:
    entry = './lib/index.js';
    break;
}



module.exports = {
  entry,

  target: 'web',

  output: {
    path: extendedPath,
    filename: `[name]${
      process.env.OPTIMIZE_MINIMIZE ? '.min' : ''
    }.js`,
    library: `${!process.env.LIBRARY ? '' : process.env.LIBRARY}`,
    libraryTarget: 'umd',
  },

  module: {

    rules: [
      {
        test: /\.js?$/,
        include: [
          path.resolve(__dirname, ''),
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules'),
        ],
        loader: 'babel-loader',
      },

      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],

  },

  plugins: [
    new HtmlWebPackPlugin({
      template: './test/demo/index.html',
      filename: './index.html',
      title: 'Dashboard Builder'
    })
  ],

  resolve: {
    modules: [
      'node_modules',
    ],
    extensions: ['.js', '.json', '.jsx'],
  },

  optimization: {
    minimize: !!process.env.OPTIMIZE_MINIMIZE,
  },

  devtool: 'source-map',

  context: __dirname,

  // stats: 'verbose',

  mode: process.env.NODE_ENV,

  devServer: {
    contentBase: path.join(__dirname, 'test/demo'),
    publicPath: '/',
    open: true,
    watchContentBase: true,
    historyApiFallback: true,
  },

};
