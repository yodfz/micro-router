const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const base = require('./base')

// 加入热更新头
// 'webpack-hot-middleware/client'
const { entry } = base
const hotJS = 'webpack-hot-middleware/client?reload=true'
if (entry instanceof Array) {
  entry.unshift(hotJS)
} else {
  Object.keys(entry).forEach(key => {
    let item = entry[key]
    if (item instanceof Array) {
      item.unshift(hotJS)
    } else {
      item = [hotJS, item]
    }
    entry[key] = item
  })
}

base.entry = entry

// console.log('base', hotEntry)
module.exports = merge(base, {
  // entry: hotEntry,
  devServer: {
    hot: true,
    host: 'localhost',
    port: '3000',
    historyApiFallback: true,
    contentBase: path.join(__dirname, './dist'),
  },
  plugins: [
    // 可以看到是哪个组件编译的
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
})
