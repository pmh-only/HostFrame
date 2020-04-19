const port = process.env.hostPort || 8080
const sslPort = process.env.hostSSLPort || 8443

const cors = require('cors')
const path = require('path').resolve()
const http = require('http')
const https = require('https')
const express = require('express')
const socketIo = require('socket.io')
const { readFileSync, readdir, existsSync } = require('fs')

const Rapp = require('./class/Rapp')

const app = express()
const ssl = { cert: readFileSync(path + '/cert/trinets-cert.pem'), key: readFileSync(path + '/cert/trinets-key.pem') }

const serv = http.createServer(app).listen(port, () => { console.log('Non-SSL Server is now on http://localhost:' + port) })
const sserv = https.createServer(ssl, app).listen(sslPort, () => { console.log('SSL Server is now on https://localhost:' + sslPort) })

const socket = socketIo(serv)
const ssocket = socketIo(sserv)

Rapp.reg(app)

app.get('/', (_req, res) => res.redirect('/main'))

readdir(path + '/router', (err, routers) => {
  if (err) console.log(err)
  routers.forEach((router) => {
    if (!existsSync(path + '/router/' + router + '/index.js')) return
    router = require(path + '/router/' + router + '/index')

    if (router.static) app.use(router._root + router.static, express.static(path + '/router/' + router._root + router.static))
    if (router._cors) app.use(router._root, cors())
    if (router._parser) {
      router._parser.forEach((p) => {
        switch (p) {
          case 'raw': { app.use(router._root, express.raw()); break }
          case 'json': { app.use(router._root, express.json()); break }
          case 'text': { app.use(router._root, express.text()); break }
          case 'form': { app.use(router._root, express.urlencoded()); break }
        }
      })
    }

    const rapp = new Rapp(router._root)
    router.ready(rapp, router._socket ? { ws: socket, wss: ssocket } : undefined)
  })
})
