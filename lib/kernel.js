const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const file = require('../utils/file')
const { dependencies } = file.parse('package.json')
const externals = (() => {
  let exts = {}

  Object.keys(dependencies).forEach(value => {
    exts[value] = `commonjs2 ${value}`
  })
  return exts
})()
const createEslintLoader = rgx => ({
  test: rgx,
  enforce: 'pre',
  use: [{
    loader: 'eslint-loader',
    options: { formatter: require('eslint-friendly-formatter') }
  }]
})

// Webpack config
const generator = (ic, env = 'development') => {
  let resolveRoot = path.resolve(ic.root)
  let NODE_ENV = process.env.NODE_ENV = env.toLowerCase()
  let entry = (() => {
    let rgx = /(\.m?[jt]s)$/
    let files = file.search(resolveRoot, rgx)
    let clone = {}

    // Push entry's name
    files.map(value => {
      let basename = path.basename(value, value.match(rgx)[1])
      return clone[basename] = path.join(resolveRoot, value)
    })
    return clone
  })()

  return {
    entry,

    externals,

    output: {
      filename: 'www',
      chunkFilename: 'js/[name].[chunkhash:13].js',
      path: path.resolve(ic.output)
    },

    target: 'node',

    mode: env,

    resolve: {
      extensions: [
        '.mjs', '.js', '.json', '.hbs', '.ts', '.tsx', '.vue', '.jsx', '.ejs', '.jade'
      ],
      alias: { '@': resolveRoot }
    },

    node: {
      setImmediate: false,
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      path: 'empty',
      child_process: 'empty'
    },

    module: {
      rules: [{
        test: /\.m?js$/,
        exclude: /node_modules/,
        include: [resolveRoot],
        use: {
          loader: 'babel-loader?cacheDirectory=true'
        }
      }, {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: { loader: 'ts-loader' }
      }].concat(ic.isEslint ? [
        createEslintLoader(/\.m?js$/), createEslintLoader(/\.ts$/)
      ] : [])
    },

    plugins: [
      new webpack.ProgressPlugin(),

      // Define var
      new webpack.DefinePlugin((define => {
        Object.keys(define).forEach(
          value => define[value] = JSON.stringify(define[value])
        )
        return define
      })(merge(ic.define, { NODE_ENV })))
    ]
  }
}

process.noDeprecation = true
module.exports = { generator, createEslintLoader }
