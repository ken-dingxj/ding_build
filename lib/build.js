/*
 * @Description:
 * @Author: dingxuejin
 * @Date: 2020-04-27 14:49:20
 * @LastEditTime: 2020-04-27 15:27:35
 * @LastEditors: dingxuejin
 */
process.env.NODE_ENV = "production";

const ora = require("ora");
const chalk = require("chalk");
const rm = require("rimraf");
const path = require("path");
const webpack = require("webpack");
const config = require("../config");
const webpackConfig = require("./webpack.prod.js");
console.log(webpackConfig);
const spinner = ora("building for production...");
spinner.start();

rm(
  path.join(config.build.assetsRoot, config.build.assetsSubDirectory),
  (err) => {
    if (err) throw err
    webpack(webpackConfig, (err, stats) => {
      spinner.stop();
      if (err) throw err;
      process.stdout.write(
        stats.toString({
          colors: true,
          modules: false,
          children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
          chunks: false,
          chunkModules: false,
        }) + "\n\n"
      );
      if (stats.hasErrors()) {
        console.log(chalk.red("  Build failed with errors.\n"));
        process.exit(1);
      }
      console.log(chalk.cyan("  Build complete.\n"));
      console.log(
        chalk.yellow(
          "  Tip: built files are meant to be served over an HTTP server.\n" +
            "  Opening index.html over file:// won't work.\n"
        )
      );
    });
  }
);
