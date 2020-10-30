/* global io */
/* eslint-disable no-unused-vars */

const socket = io()
const categoryNames = ['backend', 'frontend', 'desktop', 'game', 'chatbot', 'ai']
const categoryColors = ['#bf616a', '#d08770', '#ebcb8b', '#a3be8c', '#7289da', '#b48ead']

socket.emit('main:cmd', 'home')
socket.on('main:resv', (s) => {
  document.getElementsByClassName('render')[0].innerHTML = s
})

socket.on('main:apiresv', (res) => {
  document.getElementById('api').innerText = JSON.stringify(res, '\n', 2)
})
socket.on('main:dbresv', (res) => {
  if (!document.getElementById('sql')) return
  let str = '<table class="table"><thead><tr><th>username</th><th>password (hashed)</th><th>salt</th></tr></thead><tbody>'
  for (const each of res) {
    str += '<tr><td>' + each.username + '</td><td>' + each.password.substring(0, 30) + '...</td><td>' + each.salt + '</td></tr>'
  }
  str += '</tbody></table>'
  document.getElementById('sql').innerHTML = str
})

document.addEventListener('keydown', (ev) => {
  if (ev.key === 'Escape') home()
})

function home () {
  document.title = 'PMH.codes'
  document.getElementsByClassName('render')[0].innerHTML = ''
  document.getElementsByClassName('bg')[0].style.backgroundColor = '#ffffff'
  socket.emit('main:cmd', 'home')
}

function category (no) {
  document.title = 'PMH.codes - ' + categoryNames[no]
  document.getElementsByClassName('render')[0].innerHTML = ''
  document.getElementsByClassName('bg')[0].style.backgroundColor = categoryColors[no]
  socket.emit('main:cmd', categoryNames[no])
}

function login (process) {
  socket.emit('main:' + process, { username: document.getElementById('username').value, password: document.getElementById('password').value })
}

setInterval(() => socket.emit('main:dbfetch'), 100)
