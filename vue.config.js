"use strict";

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 8080; // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  // lintOnSave: process.env.NODE_ENV === 'development',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,
    port: port,
    // open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      "/yxx": {
        target: `http://125.65.83.218:9999`,
        changeOrigin: true,
        pathRewrite: {
          "^/yxx": ""
        }
      }
      // [process.env.VUE_APP_BASE_API]: {
      //   target: `http://125.65.83.218:9999`,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     ["^" + process.env.VUE_APP_BASE_API]: ""
      //   }
      // }
    }
    // before: require('./mock/mock-server.js')
  }
};
