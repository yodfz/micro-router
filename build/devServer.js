const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.dev.js')

const complier = webpack(config)

const app = express()

app.use(
  webpackDevMiddleware(complier, {
    ...config.devServer,
    publicPath: config.output.publicPath,
  })
)

app.use(webpackHotMiddleware(complier))

app.listen(3000, () => {
  console.log('服务已运行在3000端口,打开 http://localhost:300')
})
