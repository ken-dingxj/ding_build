/*
 * @Description:webpack工具类
 * @Author: dingxuejin
 * @Date: 2020-02-05 14:22:41
 * @LastEditTime: 2020-03-11 12:09:59
 * @LastEditors: dingxuejin
 */
const glob = require('glob');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const packageConfig = require('../package.json');
/**
 *获取项目根目录
 */

const projectRoot = process.cwd();
exports.projectRoot = projectRoot;

/**
 *
 *设置入口和模板文件
 *
 */
exports.setEntryAndHtmlPlugin = function () {
  const entry = {};
  const htmlWebpackPlugins = [];

  const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));

  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/src\/(.*)\/index\.js/);
    const fileName = match && match[1];
    entry[fileName] = entryFile;

    return htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(projectRoot, `src/${fileName}/index.html`),
        filename: `${fileName}.html`,
        chunks: ['vendors', fileName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      }),
    );
  });

  return {
    entry,
    htmlWebpackPlugins,
  };
};
/**
 *
 *静态资源目录
 *
 */
exports.assetsPath = function (_path) {
  return _path;
};
/**
 *
 *生成标准的样式loader
 *
 */
exports.styleLoader = function (options) {
  const output = [];
  const loaders = exports.cssLoaders(options);

  Object.keys(loaders).forEach((extension) => {
    const loader = loaders[extension];
    output.push({
      test: new RegExp(`\\.${extension}$`),
      use: loader,
    });
  });
  return output;
};
/**
 *
 * 样式loader构造
 *
 */
exports.cssLoaders = function (options) {
  const cssLoader = {
    loader: 'css-loader',
    options: {},
  };
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap,
    },
  };
  const styleLoader = {
    loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
  };

  /**
   *生成loader方法
  * @param {*} loader
  * @param {*} loaderOptions
  */
  function generateLoaders(loader, loaderOptions) {
    // eslint-disable-next-line max-len
    const loaders = options.usePostCSS ? [styleLoader, cssLoader, postcssLoader] : [styleLoader, cssLoader];
    if (loader) {
      loaders.push({
        loader: `${loader}-loader`,
        options: { ...loaderOptions, sourceMap: options.sourceMap },
      });
    }

    return loaders;
  }
  return {
    css: generateLoaders(),
    less: generateLoaders('less'),
    scss: generateLoaders('sass'),
  };
};

/**
 *
 *回调通知
 *
 */
exports.createNotifierCallback = () => {
  // eslint-disable-next-line global-require
  const notifier = require('node-notifier');
  return (severity, errors) => {
    if (severity !== 'error') return;
    const error = errors[0];
    const filename = error.file && error.file.split('!').pop();
    notifier.notify({
      title: packageConfig.name,
      message: `${severity}: ${error.name}`,
      subtitle: filename || '',
      // icon: path.join(__dirname, 'logo.png'),
    });
  };
};
