// webpack.config.js
const webpack = require('webpack')
const path = require('path')

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: ['./app.js', './index.html' ],
  output: {
    filename: 'app.js',
    path: __dirname + '/dist',
  },
  devServer: {
    port: 9000
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', { modules: false }]
          ]
        }
      }]
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader']
    },
      {
        test: /\.html$/,
        loader: 'file-loader?name=[name].[ext]',
      }]
  }
};

module.exports = config;
