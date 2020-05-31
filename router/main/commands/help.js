/**
 * @param {import('socket.io').Socket} s
 */
module.exports = (_, s) => {
  s.emit('main:resv',
    '<h1>helps.</h1>' +
    '<hr />' +
    '<ul>' +
    ' <li>help - 지금 보고 있는거</li>' +
    ' <li>ping - 핑</li>' +
    ' <li>neko - 네코 (트리넷)</li>' +
    '<ul>'
  )
}
module.exports.aliases = ['help', '도움']
