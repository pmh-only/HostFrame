const { get } = require('superagent')

/**
 * @param {import('socket.io').Socket} s
 */
module.exports = (_, s) => {
  get('localhost:8002/api?target=neko&type=url', (err, res) => {
    if (err) console.log(err)
    get('localhost:8002' + res.text, (err2, res2) => {
      if (err2) console.log(err2)
      s.emit('main:resv',
        '<h1 style="animation: shake 0.5s;">Nya!</h1>' +
        '<hr /><img height="500px" src="data:image/png;base64, ' + res2.body.toString('base64') + '">'
      )
    })
  })
}

module.exports.aliases = ['neko', '네코']
