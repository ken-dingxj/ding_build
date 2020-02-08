/*
 * @Description:webpack工具类
 * @Author: dingxuejin
 * @Date: 2020-02-05 14:22:41
 * @LastEditTime : 2020-02-05 16:32:37
 * @LastEditors  : dingxuejin
 */
const glob = require('glob');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 获取项目根目录
const projectRoot = process.cwd();
exports.projectRoot = projectRoot;


// 设置入口和模板文件
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

// 静态资源目录
exports.assetsPath = function (_path) {
  return _path;
};
