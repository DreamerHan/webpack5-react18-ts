const webpackBaseConfig = require('./webpack.base.config')
const { merge } = require('webpack-merge')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')
const glob = require('glob')
const path = require('path')


module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  devtool: false,
  optimization: {
    minimizer: [
      new CssMinimizerPlugin() // css 压缩
    ]
  },
  plugins: [
    // css tree-shaking
    new PurgeCSSPlugin({
      paths: glob.sync(path.resolve(__dirname, 'src/**/*.tsx'), { nodir: true })
    })
  ]
})