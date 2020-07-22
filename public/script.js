console.log('hello')

const socket = io()
socket.on('connected', function (data) {
    console.log(socket.id)
})

let login = document.getElementById('login')
let username = document.getElementById('username')
let submit_un = document.getElementById('submit_un')

let chat = document.getElementById('chat')
let message = document.getElementById('message')
let submit_msg = document.getElementById('submit_msg')
let list = document.getElementById('list')
let user_name = ''

submit_un.onclick = function () {
    user_name = username.value
    socket.emit('name', { name: username.value })
    login.style.display = 'none'
    chat.style.display = 'block'
}


submit_msg.onclick = function () {
    let text = message.value
    
    if (text.startsWith('@')) {
        let user = text.split(':')[0].substr(1)
        socket.emit('send_msg', { recv_user: user, user: user_name, message: text })
    } else {
        socket.emit('send_msg', { user: user_name, message: text })
    }
}

socket.on('recv_msg', function (data) {
    let child = document.createElement('li')
    if(data.message.startsWith('@')){
        data.message=data.message.split(':')[1].substr(1)
    }
    child.innerText = `${data.user} : ${data.message}`
    list.appendChild(child)
})
