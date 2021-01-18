(function () {

    const form = document.getElementById('form');           //sendBtn
    const messages = document.getElementById('messages');   //messages
    const input = document.getElementById('input');         //messageBox


    let ws;
    
    function postMessage(message) {
        console.log(`Try to posty msgy -${message}-`)
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
        ws.onopen =  () => {
            console.log('Connection opened!');
        }

        ws.onmessage = ({data}) => postMessage(data);
        ws.onclose = function() {
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

                ws.send(temp);
                postMessage(temp);
            }
        })
    }

    init();
})();
