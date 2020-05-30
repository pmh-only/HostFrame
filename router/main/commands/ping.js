/**
 * @param {import('socket.io').Socket} s
 */
module.exports = (_, s) => {
  const before = Date.now()
  s.emit('main:ping')
  s.once('main:pong', (after) => {
    s.emit('main:resv',
      '<h1 style="animation: shake 0.5s;">pong!</h1>' +
      '<hr />before: ' + before +
      '<br />after: ' + after +
      '<br />latency: <b>' + (after - before) + 'ms</b>'
    )
  })
}

module.exports.aliases = ['ping', 'p', 'speed', 'latency']
