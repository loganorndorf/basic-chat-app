const express = require('express');
const app = express();
const http = require('http');
const WebSocket = require('ws');

const port = 8080;
const server = http.createServer(app);
const wss = new WebSocket.Server({server}); //wss -> WEBSOCKET SERVER

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

wss.on('connection', function connection(ws) {
    wss.clients.forEach(function each(client) {
        if(client !==  ws && client.readyState === WebSocket.OPEN) {
            client.send(`A user just connected!`);
        }
    })

    // ws -> is the actual websocket
    ws.on('message', function incoming(data) {

        wss.clients.forEach(function each(client) {
            if(client !==  ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        })
    })

    // wss.on('disconnect', (reason) => {
    //     wss.clients.forEach(function each(client) {
    //         if(client !==  ws) {
    //             client.send("A user disconnected.");
    //         }
    //     })
    // })

})

server.listen(port, function() {
    console.log(`Server is listening on ${port}`);
})