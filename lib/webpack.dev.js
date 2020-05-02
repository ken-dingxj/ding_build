/*
 * @Description:webpack开发环境配置
 * @Author: dingxuejin
 * @Date: 2020-03-09 17:48:09
 * @LastEditTime: 2020-04-27 18:40:27
 * @LastEditors: dingxuejin
 */
const merge = require('webpack-merge');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
const baseWebpackConfig = require('./webpack.base');
const utils = require('./utils');
const config = require('../config');

const { HOST } = process.env;
const PORT = process.env.PORT && Number(process.env.PORT);

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true }),
  },
  mode: config.dev.mode,
  devtool: config.dev.devtool,
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.join(config.dev.assetsPublicPath, 'index.html') },
      ],
      hot: true,
      contentBase: false,
      compress: true,
      host: HOST || config.dev.host,
      port: PORT || config.dev.port,
      open: config.dev.autoOpenBrowser,
      overlay: config.dev.errorOverlay
        ? { warnings: false, errors: true }
        : false,
      publicPath: config.dev.assetsPublicPath,
      proxy: config.dev.proxyTable,
      quiet: true, // necessary for FriendlyErrorsPlugin
      watchOptions: {
        poll: config.dev.poll,
      },
    },
  },
  plugins: [
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*'],
      },
    ]),
  ],

});
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      process.env.PORT = port;
      devWebpackConfig.devServer.port = port;
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors ? utils.createNotifierCallback() : undefined,

      }));
      resolve(devWebpackConfig);
    }
  });
});
