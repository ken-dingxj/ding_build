const path = require('path');

module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    host: 'l,ocalhost',
    port: 8080,
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    mode: 'development',
    /**
     * Source Maps
     */
    devtool: 'cheap-module-eval-source-map',
    /**
     *
     * 浏览器缓存相关
     *
     */
    cacheBusting: true,
    /**
     *
     * css源文件映射
    *
     */
    cssSourceMap: true,
  },
  build: {
    mode: 'production',
    devtool: '#source-map',
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    assetsRoot: path.resolve(__dirname, '../dist'),
  },
};
