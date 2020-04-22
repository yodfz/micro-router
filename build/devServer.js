const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.dev.js')

const complier = webpack(config)
const app = express()

// rewite 入口文件,加入热更新代码

app.use(
  webpackDevMiddleware(complier, {
    ...config.devServer,
    publicPath: config.output.publicPath,
  })
)

app.use(webpackHotMiddleware(complier))

app.listen(config.devServer.port, () => {
  console.log(
    `服务已运行在${config.devServer.port}端口,打开 http://localhost:${config.devServer.port}`
  )
})
