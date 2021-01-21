(function () {

    const form = document.getElementById('form');           //sendBtn
    const messages = document.getElementById('messages');   //messages
    const input = document.getElementById('input');         //messageBox

    const setName = document.getElementById('username-form');
    const username = document.getElementById('username');


    let ws;
    
    function postMessage(message) {
        let item = document.createElement('li');
        item.textContent = message;
        messages.appendChild(item);

        window.scroll(0, document.body.scrollHeight);
    }
    
    function init() {
        if(ws) {
            ws.onerror = ws.open = ws.onclose = null;
            ws.close();
        }

        ws = new WebSocket('ws://localhost:8080');



        ws.onopen = () => {
            console.log('Connection opened!');
        }

        ws.onmessage = ({data}) => postMessage(data);
        ws.onclose = function() {
            console.log("Closing connection!");
            ws = null;
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if(!ws) {
                postMessage("No WebSocket connection :(");
                return;
            }

            if(input.value) {
                const temp = input.value;
                input.value = '';

                ws.send({
                    msgType: 'MESSAGE',
                    msg: temp
                });
                postMessage(temp);
            }
        })

        setName.addEventListener('submit', function(e) {
            e.preventDefault();

            // console.log(username.value);

            ws.send(JSON.stringify({
                msgType: 'SET_USERNAME',
                msg: username.value
            }));
            postMessage(`You set your username to ${username.value}`);
        })
    }

    init();
})();
