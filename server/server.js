import express from 'express';
import {Server} from 'socket.io';

const app = express();


let server = app.listen(3000, ()=>{
    console.log('listening on port 3000')
});

const io = new Server(server, {
    cors: '*'
});

io.on('connection', (socket)=>{
    console.log('A user connects with id: ', socket.id);
    socket.on("chat message", (msg) => {
        console.log("Message received: " + msg);
    
        socket.broadcast.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });

    socket.on('Typing', ()=>{
        socket.broadcast.emit('userTyping');
    });

    socket.on('stopTyping', ()=>{
        socket.broadcast.emit('userStopTyping');
    });
})