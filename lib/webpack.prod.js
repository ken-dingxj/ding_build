/*
 * @Description:
 * @Author: dingxuejin
 * @Date: 2020-03-12 14:10:30
 * @LastEditTime: 2020-04-27 16:00:21
 * @LastEditors: dingxuejin
 */
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const utils = require('./utils');
const config = require('../config');
const baseWebpackConfig = require('./webpack.base.js');


const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, usePostCSS: true }),
  },
  mode: config.build.mode,
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      chunkFilename: utils.assetsPath('css/[id].css'),
    }),
  ],
});
module.exports =webpackConfig;
