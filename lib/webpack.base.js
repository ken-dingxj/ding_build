/*
 * @Description:基础配置
 * @Author: dingxuejin
 * @Date: 2020-02-03 14:23:49
 * @LastEditTime : 2020-02-05 16:37:07
 * @LastEditors  : dingxuejin
 */

const path = require('path');
const utils = require('./utils');

const { entry, htmlWebpackPlugins } = utils.setEntryAndHtmlPlugin();
module.exports = {
  entry,
  output: {
    path: path.join(utils.projectRoot, 'dist'),
    filename: '[name]_[chunkhash:8].js',
  },
  // 配置模块如何解析
  resolve: {
    // 自动解析确定的扩展
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      // 解析js,jsx
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      // 解析图片文件
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
        },
      },
      // 解析音频文件
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]'),
        },
      },
      // 解析字体文件
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
        },
      },
    ],
  },
};
