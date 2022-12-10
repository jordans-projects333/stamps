const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io")
const formatMessage = require('./utils/messages')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));

io.on('connection', (socket) => {
    // Send data to user
    socket.emit('message', 'welcome')

    // Broadcast when user connects(emit to everyone except user)
    socket.broadcast.emit('message', "l")

    // Runs when user disconnects
    socket.on('disconnect', () => {
        // Send data to everyone
        io.emit('message', "s")
    })

    // Listen for chat message
    socket.on('chatMessage', (msg) => {
        socket.broadcast.emit('point', msg)
    })
    
})



const PORT = 3000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))