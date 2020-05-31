/* global io */

window.onload = () => {
  /**
   * @type {HTMLInputElement}
   */
  const input = document.getElementsByClassName('input')[0]
  const socket = io()

  input.addEventListener('keypress', (ev) => {
    if (ev.charCode !== 13) return
    socket.emit('main:cmd', input.value)
    input.value = ''
  })

  input.addEventListener('focusout', () => {
    input.focus()
  })

  socket.on('main:resv', (s) => {
    document.getElementsByClassName('render')[0].innerHTML = s
  })

  socket.on('main:ping', () => {
    socket.emit('main:pong')
  })
}
