console.log('hello')

const socket = io()
socket.on('connected', function (data) {
    console.log(socket.id)
})