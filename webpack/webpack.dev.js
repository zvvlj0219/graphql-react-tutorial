const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  output: {
    path: path.resolve(process.cwd(), "dist"),
    filename: "js/[name].[contenthash].bundle.js",
    chunkFilename: "js/[name].[contenthash].js",
    assetModuleFilename: "images/[hash][ext]"
  },
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(process.cwd(), "dist"),
    },
    historyApiFallback: true,
    port: 3000,
    host: "localhost",
    proxy: {
      "/api/**": {
        target: "http://localhost:5000",
        secure: false,
        logLevel: "debug"
      }
    }
  },
});