const express = require('express');
const app = express(); // initialize 'app' to be function handle
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/app.html');
});

io.on('connect', (socket) => {
    io.emit('connection', 'A user has connected');

    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    })


    socket.on('disconnect', () => {
        io.emit('disconnection', 'A user has disconnected');
    })
})

http.listen(3000, () => {
    console.log('Server listening on port 3000');
})