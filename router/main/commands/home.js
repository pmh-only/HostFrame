const { readFileSync } = require('fs')
const { Converter } = require('showdown')
const path = require('path').resolve()

let buffer = ''
setInterval(() => {
  const conv = new Converter()
  conv.setOption('customizedHeaderId', true)
  conv.setOption('parseImgDimensions', true)
  conv.setOption('strikethrough', true)
  conv.setOption('tables', true)
  conv.setOption('tasklists', true)
  conv.setOption('emoji', true)

  const text = readFileSync(path + '/router/main/docs/me.md')
  const html = conv.makeHtml(text.toString('utf-8'))
  buffer = readFileSync(path + '/router/main/pages/home.html').toString('utf-8').replace('{{$render-point}}', html)
}, 1000)

/**
 * @param {import('socket.io').Socket} s
 */
module.exports = (_, s) => s.emit('main:resv', buffer)

module.exports.aliases = ['home']
