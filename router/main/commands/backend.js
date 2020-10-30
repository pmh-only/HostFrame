const { readFileSync } = require('fs')
const path = require('path').resolve()
const sha256 = require('sha256')

/**
 * @param {import('socket.io').Socket} s
 * @param {import('knex')} db
 */
module.exports = (_, s, db) => {
  s.emit('main:resv', readFileSync(path + '/router/main/pages/backend.html').toString('utf-8'))
  s.on('main:dbfetch', async () => s.emit('main:dbresv', await db.select('*').from('users').limit(30)))
  s.on('main:dbrefresh', async () => await db.delete().from('users'))

  s.on('main:login', async (data) => {
    const [user] = await db.select('*').where('username', data.username).from('users')
    if (!user) return s.emit('main:apiresv', { process: 'login', success: false, reason: 'user not found' })

    const password = sha256(user.salt + data.password)
    if (user.password !== password) return s.emit('main:apipresv', { process: 'login', success: false, reason: 'password is not correct' })
    s.emit('main:apiresv', { process: 'login', success: true, reason: null })
  })

  s.on('main:signin', async (data) => {
    const [user] = await db.select('*').where('username', data.username).from('users')
    if (user) return s.emit('main:apiresv', { process: 'signin', success: false, reason: 'user aleady exists' })

    let salt = ''
    for (let i = 0; i < 8; i++) {
      salt += i % 2 < 1
        ? String.fromCharCode(Math.floor(Math.random() * 106 - 8) + 21 + i)
        : String.fromCharCode(Math.floor(Math.random() * 169 - 8) + 697 + i)
    }

    const password = sha256(salt + data.password)
    await db.insert({ username: data.username, password, salt }).into('users')
    s.emit('main:apiresv', { process: 'signin', success: true, reason: null })
  })
}

module.exports.aliases = ['backend']
