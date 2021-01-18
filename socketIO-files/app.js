const express = require('express');
const app = express(); // initialize 'app' to be function handle
const http = require('http').createServer(app);

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/resources'));
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/app.html');
});

io.on('connection', (socket) => {
    // console.log(socket);
    io.emit('connection', 'A user has connected');
    socket.join('friends');

    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    })

    socket.on('set username', (username) => {

        let user = 'A user'
        if(socket.username) {
            user = socket.username;
        }
        
        socket.username = username;
        console.log('New Username: ', socket.username)

        io.emit('set username', `${user} has changed their nickname to ${socket.username}`);
    })

    socket.on('disconnect', (reason) => {
        console.log(reason);
        let user = 'A user'
        if(socket.username) {
            user = socket.username;
        }
        io.emit('disconnection', `${user} has disconnected.`);
    })
})

http.listen(3000, () => {
    console.log('Server listening on port 3000');
})