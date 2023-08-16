const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const path = require('path');

require('dotenv').config();

const userController = require('./controllers/Users/UsersController');


/*  */
app.get('/', (req, resp) => {
    var option = {
        root: path.join(__dirname + "/resources/views/")
    }
    var file_name = 'index.html';
    resp.sendFile(file_name, option)
});

io.on('connection', async (socket) => {
    console.log("\x1b[33m%s\x1b[0m", "Connected with Socket IO ....");
    try {
        const users = await userController.list();
        socket.emit('usersDetails', users);
    } catch (error) {
    
        console.error('Error fetching users:', error);
    }
    socket.on('disconnect', () => {
        console.log("\x1b[31m","Disconnected with Socket IO ....");
    });
});

const port = process.env.PORT || 4500;
server.listen(port, () => {
    console.log(`INFO  Server running on  [http://localhost:${port}]`);
    console.log("\x1b[33m%s\x1b[0m", "Press Ctrl+C to stop the server");
});