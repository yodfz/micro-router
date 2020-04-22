const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'development', // development
  devtool: 'cheap-source-map',
  entry: {
    app: './src/index.tsx',
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        // 主要使用他来压缩html
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'], // 自动判断后缀名，引入时可以不带后缀
    alias: {
      '@': path.resolve(__dirname, '../src/'), // 以 @ 表示src目录
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../public/index.html'),
      showErrors: true,
    }),
    new CleanWebpackPlugin(),
  ],
  // optimization: {
  //   splitChunks: {
  //     chunks: 'initial', // 共有三个值可选：initial(初始模块)、async(按需加载模块)和all(全部模块)
  //     minSize: 30000, // 模块超过30k自动被抽离成公共模块
  //     minChunks: 1, // 模块被引用>=1次，便分割
  //     maxAsyncRequests: 5, // 异步加载chunk的并发请求数量<=5
  //     maxInitialRequests: 3, // 一个入口并发加载的chunk数量<=3
  //     name: true, // 默认由模块名+hash命名，名称相同时多个模块将合并为1个，可以设置为function
  //     automaticNameDelimiter: '.', // 命名分隔符
  //     cacheGroups: {
  //       // 缓存组，会继承和覆盖splitChunks的配置
  //       default: {
  //         // 模块缓存规则，设置为false，默认缓存组将禁用
  //         minChunks: 2, // 模块被引用>=2次，拆分至vendors公共模块
  //         priority: -20, // 优先级
  //         reuseExistingChunk: true, // 默认使用已有的模块
  //       },
  //       vendors: {
  //         test: /[\\/]node_modules[\\/]/, // 表示默认拆分node_modules中的模块
  //         priority: -10,
  //       },
  //     },
  //   },
  // },
}
