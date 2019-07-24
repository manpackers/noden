![npm](https://img.shields.io/npm/v/@manpacker/noden.svg)
![npm bundle size](https://img.shields.io/bundlephobia/min/@manpacker/noden.svg)
![npm](https://img.shields.io/npm/dw/@manpacker/noden.svg)
![NPM](https://img.shields.io/npm/l/@manpacker/noden.svg)
<br><br>
![nodei.co](https://nodei.co/npm/@manpacker/noden.png?downloads=true&downloadRank=true&stars=true)
<br>
# Explain
Noden is a set of build engine based on [webpack](https://www.webpackjs.com/) to build engine package.<br>
Entry file supported file extension <code>js</code> or <code>ts</code><br>
Support for multi-portal file build, Files must be in the build <code>root</code> directory.<br>
## .manpackeric
Project default initialization file, Can be a <code>javascript</code> script file, or a <code>json</code> configuration file.<br>
Example: json<br>
```
{"output": "bin"}
```
You can also set the <code>manpacker</code> field in the <code>package.json</code> file.<br>
Example:<br>
```
{"manpacker": {"root": "app"}}
```
Final input result, Merge <code>.manpackeric</code> config item.
```
{"root": "app", "output": "bin"}
```
You can customize the project initialization file name.<br>
Example:<br>
Custom name: development.ic.js
```
npx manpacker-noden --ci development.ic.js
```
```
manpacker-noden --ci development.ic.js
```
# Install
```
npm i @manpacker/noden -D
```
# Usage
## CLI
Start the local development environment.
```
manpacker-noden server
```
```
manpacker-noden server --ic [value] -c [config] --port [number]
```
Construction of production environment engineering project.
```
manpacker-noden build
```
```
manpacker-noden build --ic [value] -c [config]
```
## API
```
const noden = require('@manpacker/noden')
```
### method
#### .compile
Core compilation method
```
const { compile } = require('@manpacker/noden')
compile({ env, ic, config })
```

|param|type|explain|
|-----|----|-------|
|env|string|<code>env: NDOE_ENV variabl</code>|
|ic|object|<code>[.manpackeric](#.manpackeric)</code> config item object|
|config|function|<code>[manpacker.noden.js](#manpacker.noden.js)</code> return funtion|

#### .Commander
Commander is Create command-line class.
```
const { Commander } = require('@manpacker/noden')

let { version } = require('./package.json')
let commander = new Commander({ version })

```
Explain commander methods

|method|explain|
|------|-------|
|build|Default build production environment, enter project directory|
|server|Launch Development Environment, Local Interconnect Service, default Port 8090|
|parse|Compile registration command Lint|

#### .createEslintLoader
Create Eslint loader generator.

|param|teype|explain|
|-----|-----|-------|
|rgx|RegExp|Create eslint loader.|

## .manpackeric
Default root file name: <code>.manpackeric</code><br>
Configuration item description:<br>

|name|type|value|description|
|----|----|-----|-----------|
|root|string|default: app| Source directory for building the project|
|output|string|default: view|Directory output after build|
|define|object|dedalut: {NODE_ENV: process.env.NODE_ENV}|Define constants in a project, <code>eslintrc</code> set global key-value|
|isEslint|boolean|default: true|Start the eslint-loader feature by default|
|isExternalsDependencies|boolean|default: false|Build package dependency package|

## manpacker.noden.js
Default root file name: <code>manpacker.noden.js</code>
```
module.exports = ic => {
  // webpack config item.
  return {}
}
```
The parameter <code>ic</code> is the injected initialization parameter object.<br>
Webpack configuration items can be set based on <code>ic</code>
## Npm
[link](https://www.npmjs.com/package/@manpacker/noden)
