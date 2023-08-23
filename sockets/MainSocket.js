const userController = require('../controllers/Users/UsersController'); // Adjust the path
const gameController = require('../controllers/Game/GameController');
function initializeSocket(server) {
    const io = require('socket.io')(server, {
        cors: {
            origin: '*',
        }
    });
    io.on('connection', async (socket) => {
        console.log("\x1b[32m", "Connected with Socket IO ....");
        socket.on('disconnect', () => {
            console.log("\x1b[31m", "Disconnected with Socket IO ....");
        });
        socket.on('users', async (request) => {
            try {
                // if (request.role_id == '') {
                //     socket.emit('validation_error', { message: 'role_id parameter is required!' });
                //     return false;
                // }
                const users = await userController.list(request);
                socket.emit('usersDetails', users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        });


        socket.on('bookings', async (request) => {
            try {
                const bookings = await gameController.list(request);
                socket.emit('all_bookings', bookings);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        });

        socket.on('bookables', async (request) => {
            try {
                const bookings = await gameController.bookable_list(request);
                socket.emit('all_bookables', bookings);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        })

        socket.on('lane', async (request) => {
            try {
                const bookings = await gameController.lane_list(request);
                socket.emit('all_lanes', bookings);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        })
    });
    return io;
}
module.exports = initializeSocket;
