const socket = io('http://localhost:3000/');

const messageInput = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container')

function sendMessage(){
    console.log(messageInput.value);
    const messageText = messageInput.value.trim();
    if (messageText) {
        socket.emit("chat message", messageText);

        const sentMessage = document.createElement("div");
        sentMessage.classList.add("message", "sent");
        sentMessage.innerText = messageText;
        messageContainer.appendChild(sentMessage);

        messageInput.value = "";
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }
}

socket.on("chat message", (msg) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", "received");
    messageElement.innerText = msg;
    messageContainer.appendChild(messageElement);

    messageContainer.scrollTop = messageContainer.scrollHeight;
});

messageInput.addEventListener('input', ()=>{
    socket.emit('Typing');
});

socket.on('userTyping', ()=>{
    document.getElementById('typing').textContent = 'Typing...';
});

messageInput.addEventListener('keyup', ()=>{
    socket.emit('stopTyping');
});

socket.on('userStopTyping', ()=>{
    setTimeout(()=>{
        document.getElementById('typing').textContent = '';
    }, 1000);
});