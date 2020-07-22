const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use('/', express.static('./public'))

let users = {}

io.on('connection', function (socket) {
    
    // console.log(socket.id)
    socket.emit('connected', { msg: 'Connected' })

    socket.on('name', function (data) {
        users[data.name] = socket.id
        // console.log(users)
    })

    socket.on('send_msg', function (data) {
        console.log(data)
        if (data.recv_user) {
            io.to(users[data.recv_user]).emit('recv_msg', data)
        } else {
            socket.broadcast.emit('recv_msg', data)
        }
    })
})

server.listen(1234, function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Server started')
})