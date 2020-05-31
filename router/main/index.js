module.exports = { _root: '/main', _socket: false, _cors: true, _parser: [], ready, static: '/' }

const Query = require('./classes/Query')
const { resolve: path } = require('path')
const { readdir } = require('fs')
const commands = []

const cmdRoot = path() + '/router/main/commands/'
readdir(cmdRoot, (err, cmds) => {
  if (err) console.log(err)
  cmds.forEach((cmd) => {
    commands.push(require(cmdRoot + cmd.replace('.js', '')))
  })
})

/**
 * @param {import('socket.io').Server} socket
 */
function ready (_, socket) {
  socket.on('connect', (s) => {
    s.on('main:cmd', (context) => {
      const query = new Query(context)
      const target = commands.find((v) => v.aliases.includes(query.cmd))
      if (target) target(query, s)
      else s.emit('main:resv', '<h1 style="animation: shake 0.5s; color: red;">Error.</h1><hr />Command "' + query.cmd + '" not found')
    })
  })
}
