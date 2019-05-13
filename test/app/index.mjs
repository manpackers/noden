import http from 'http'
import path from 'path'
import koa from 'koa'
import tool from './utils/tool'

const server = http.createServer((req, rep) => {
  rep.writeHead(200, { 'Content-Type': 'text/plain' })
  rep.end('Hello World!!')
})

// eslint-disable-next-line
console.log(path)
// eslint-disable-next-line
console.log(koa)
// eslint-disable-next-line
console.log(tool)

server.listen(3000, () => {
  // eslint-disable-next-line
  console.log('start test')
})
