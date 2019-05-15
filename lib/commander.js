const commander = require('commander')
const merge = require('webpack-merge')

const file = require('../utils/file')
const ic = require('./config/ic')

const inital = version => commander.version(version)
  .usage('<command> [option]')
  .option(
    '--ic, [file:string]',
    'Initialize config item at compile time.',
    '.manpackeric'
  )
  .option(
    '-c, --config [file:string]',
    'The root (current project) settings config file.',
    './manpacker.noden.js'
  )
  .option(
    '-r, --root [file:string]',
    'Construction engineering project root directory.',
    ic.root
  )

module.exports = class {
  constructor({ version }) { inital(version) }

  async build() {
    return await new Promise(resolve => commander.command('build')
      .option('-o, --output [path:String]', 'Specify output results directory')
      .action(options => {
        let { output } = options
        resolve({
          ic: merge(file.parse(commander.ic), { output }),
          config: file.exec(commander.config)
        })
      }))
  }

  async server() {
    return await new Promise(resolve => commander.command('server')
      .action(() => {
        resolve({ ic: file.parse(commander.ic), config: file.exec(commander.config) })
      }))
  }

  parse() {
    commander.parse(process.argv)
    return this
  }
}
