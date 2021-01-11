var socket = io();
        
let messages    = document.getElementById('messages');
let form        = document.getElementById('form');
let input       = document.getElementById('input');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if(input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
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

socket.on('chat message', function(msg) {
    let item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);

    window.scroll(0, document.body.scrollHeight);
})

        