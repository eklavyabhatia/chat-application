const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use('/', express.static('./public'))


io.on('connection', function (socket) {
    console.log(socket.id)
    socket.emit('connected', { msg: 'Connected' })
})

server.listen(1234, function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Server started')
})