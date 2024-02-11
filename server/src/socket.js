const { joinRoom } = require('./controllers/server/user-room');
const { createMessage } = require('./controllers/server/message');

const socketIoHandler = (io) => {
  // Run socketIo when client connects
  io.on('connect', (socket) => {
    console.log(`Client connected with id: ${socket.id}`);

    socket.on('join_chat', async (data) => {
      console.log('Join chat!', data);
      const { userId, roomId, username } = data;

      // Join room
      socket.join(roomId);
    });

    socket.on('send_message', async (data) => {
      console.log('data', data);
      const { message, userId, roomId } = data;

      // Save to database
      try {
        const newMessage = await createMessage(message, userId, roomId);
        console.log('Message saved', newMessage);

        io.in(roomId).emit('new_message', newMessage);
      } catch (error) {
        const errorMessage = `Failed to save message. ${error.message}`;

        console.log('errorMessage', errorMessage);
        socket.emit('send_message_error', {
          message: errorMessage,
        });
        return;
      }
    });

    socket.on('disconnect', () =>
      console.log(`Client disconnected with id: ${socket.id}`)
    );
  });
};

module.exports = {
  socketIoHandler,
};
