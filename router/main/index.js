module.exports = { _root: '/main', _socket: false, _cors: true, _parser: [], ready, static: '/' }

const Query = require('./classes/Query')
const { resolve: path } = require('path')
const { readdir } = require('fs')
const knex = require('knex')

const db = knex({ client: 'mysql', connection: { host: 'localhost', user: 'pmhcodes', database: 'pmhcodes' } })
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
    s.on('main:chat', (res) => socket.emit('main:chat', res))
    s.on('main:cmd', (context) => {
      const query = new Query(context)
      const target = commands.find((v) => v.aliases.includes(query.cmd))
      if (target) target(query, s, db)
    })
  })
}
