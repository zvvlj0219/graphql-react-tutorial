const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path")

module.exports = merge(common, {
  mode: "production",
  output: {
    path: path.resolve(process.cwd(),"dist"),
    filename: "js/[name].[contenthash].bundle.js",
    chunkFilename: "js/[name].[contenthash].js",
    assetModuleFilename: "images/[hash][ext]"
  },
  optimization:{
    minimizer:[
      new TerserPlugin({
        // not generate license file
        extractComments:false,
        terserOptions:{
          compress:{
            drop_console:true,
          }
        }
      }),
    ]
  }
})