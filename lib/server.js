const chalk = require('chalk')
const ora = require('ora')
const webpack = require('webpack')
const merge = require('webpack-merge')
const file = require('../utils/file')

module.exports = async(ic, config) => {
  let webpackConfig = merge.smart({
    devtool: 'cheap-module-eval-source-map',

    plugins: [
      // remove hot module plugin.
      // new webpack.HotModuleReplacementPlugin()
    ]
  }, config)
  let complie = webpack(webpackConfig)
  let spinner = ora('  Start building the project in real time……\n\n').start()
  let stats

  await file.remove(ic.output)
  stats = await new Promise(
    (resolve, reject) => complie.watch({}, (err, stats) => {
      if (err) {
        return reject(err)
      }
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')
      return resolve(stats)
    })
  )
  spinner.stop()
  if (stats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'))
    process.exit(1)
  }
  return stats
}
