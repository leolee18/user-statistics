const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const baseConfig = require('./webpack.base.conf');
module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'none',
  module: {
    rules: []
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
});
