const express = require('express');
const app = express();
// const EventEmitter = require('events'); ... Was thinking I may have to use this, but after looking at it, maybe not
const http = require('http');
const WebSocket = require('ws');

const port = 8080;
const server = http.createServer(app);

// const eventEmitter = new EventEmitter();
const wss = new WebSocket.Server({server}); //wss -> WEBSOCKET SERVER

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

wss.on('connection', function connection(ws) {
    wss.clients.forEach(function each(client) {
        if(client !==  ws && client.readyState === WebSocket.OPEN) {
        
            client.send('A user has connected!');
        }
    })

    // ws -> is the actual websocket
    ws.on('message', function incoming(message) {
        const data = JSON.parse(message);

        if(data.msgType === 'SET_USERNAME') {
            let nickname = ws.username || 'A user';

            ws.username = data.msg;
            wss.clients.forEach(function each(client) {
                if(client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(`${nickname} has changed their name to ${ws.username}`);
                }
            })
        }

        if(data.msgType === 'MESSAGE') {
            wss.clients.forEach(function each(client) {
                if(client !==  ws && client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            })
        }
    })

    ws.on('close', function close(reason) {
        console.log(reason);
        console.log("Closed websocket");
    });

})

server.listen(port, function() {
    console.log(`Server is listening on ${port}`);
})