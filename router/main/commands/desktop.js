const { readFileSync } = require('fs')
const path = require('path').resolve()

/**
 * @param {import('socket.io').Socket} s
 */
module.exports = (_, s) =>
  s.emit('main:resv', readFileSync(path + '/router/main/pages/desktop.html').toString('utf-8'))

module.exports.aliases = ['desktop']
