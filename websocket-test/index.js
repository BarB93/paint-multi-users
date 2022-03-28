const btn = document.getElementById('btn')
const socket = new WebSocket('ws://localhost:5000/')

socket.onopen = () => {
    socket.send(JSON.stringify({
        method: 'connection',
        id: 555,
        username: "BBarb"
    }))
}

socket.onmessage = (event) => {
    console.log('С сервера пришло сообщение', event.data)
}

btn.onclick = () => {
    socket.send(JSON.stringify({
        message: 'Привет',
        method: 'message',
        id: 555,
        username: "BBarb"
    }))
}