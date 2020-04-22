const ora = require('ora')
const chalk = require('chalk')
const webpack = require('webpack')
const webpackConfig = require('./webpack.build')

const spinner = ora('打包开始...')
spinner.start()
const starttime = +new Date()
webpack(webpackConfig, (err, stats) => {
  spinner.stop()
  if (err) throw err
  process.stdout.write(
    `${stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: true,
      chunkModules: false,
    })}\n\n`
  )
  console.log(chalk.cyan('打包完成.'))
  console.log(chalk.cyan(`总耗时:${new Date() - starttime}毫秒`))
})
