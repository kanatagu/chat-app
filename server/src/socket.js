const { createMessage } = require('./controllers/server/message');
const { getAdminUserId } = require('./controllers/server/user');
const { joinRoom } = require('./controllers/server/user-room');

const socketIoHandler = (io) => {
  // Run socketIo when client connects
  io.on('connect', (socket) => {
    console.log(`Client connected with id: ${socket.id}`);

    // Join the chat
    socket.on('join_chat', async (data) => {
      const { roomId } = data;

      socket.join(roomId);
    });

    socket.on('send_message', async (data) => {
      const { message, userId, roomId } = data;

      // Save to database
      try {
        const newMessage = await createMessage(message, userId, roomId);

        io.in(roomId).emit('new_message', newMessage);
      } catch (error) {
        const errorMessage = `Failed to save message. ${error.message}`;

        socket.emit('send_message_error', {
          message: errorMessage,
        });
        return;
      }
    });

    // Join the room (add to userRoom List)
    socket.on('join_room', async (data) => {
      const { userId, roomId, username } = data;

      try {
        await joinRoom(userId, roomId);

        const joinMessage = `${username} has joined the room!`;

        const adminUserId = await getAdminUserId();
        const newMessage = await createMessage(
          joinMessage,
          adminUserId,
          roomId
        );

        // Emit a join room success event
        socket.emit('join_room_success');

        // Emit the new message to all clients in the room
        io.in(roomId).emit('new_message', newMessage);
      } catch (error) {
        const errorMessage = `Failed to join room. ${error.message}`;

        socket.emit('join_room_error', {
          message: errorMessage,
        });
        return;
      }
    });

    // Leave the chat
    socket.on('leave_chat', async (data) => {
      const { roomId } = data;

      socket.leave(roomId);
    });

    socket.on('disconnect', () =>
      console.log(`Client disconnected with id: ${socket.id}`)
    );
  });
};

module.exports = {
  socketIoHandler,
};
