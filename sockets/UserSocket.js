
const socketIo = require('socket.io');
const userController = require('../controllers/Users/UsersController'); // Adjust the path

const usersDetails = (server)=>{
    const io = socketIo(server);

    io.on('connection', async (socket) => {
        console.log("\x1b[32m", "Connected with Socket IO ....");
        try {
            const users = await userController.list();
            socket.emit('usersDetails', users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }

        socket.on('disconnect', () => {
            console.log("\x1b[31m", "Disconnected with Socket IO ....");
        });
    });

    return io;
}


module.exports = usersDetails;
