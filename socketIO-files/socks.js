var ws = new WebSocket('ws://localhost:3000');
        
let messages    = document.getElementById('messages');
let form        = document.getElementById('form');
let input       = document.getElementById('input');
let settings    = document.getElementById('username-form');
let username    = document.getElementById('username');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if(input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
})

settings.addEventListener('submit', function(e) {
    if(username.value) {
        socket.emit('set username', username.value);
    }
})


const connectionFunc = function(msg) {
    let item = document.createElement('li');
    item.textContent = msg;
    item.style.color = '#A9A9A9';
    messages.append(item);

    window.scroll(0, document.body.scrollHeight);
}

socket.on('connection', connectionFunc);

socket.on('disconnection', connectionFunc);

socket.on('set username', connectionFunc);

socket.on('chat message', function(msg) {
    let item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);

    window.scroll(0, document.body.scrollHeight);
})

        