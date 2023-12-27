const webpackBaseConfig = require('./webpack.base.config')
const { merge } = require('webpack-merge')

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: 9527,
    hot: true,
  }
})