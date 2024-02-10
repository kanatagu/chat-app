const pool = require('../../db/pool');

/**
 * @desc Join room
 */
const joinRoom = async (userId, roomId) => {
  try {
    // Check if the room exists
    const room = await pool.query('SELECT * FROM rooms WHERE id = $1', [
      roomId,
    ]);

    if (!room.rows[0]) throw new Error('Room not found');

    // Check if the user already joined the room
    const joinedRoom = await pool.query(
      'SELECT rooms FROM users WHERE id = $1',
      [userId]
    );

    if (joinedRoom.rows[0].rooms.includes(Number(roomId))) {
      throw new Error('User already joined the room');
    }

    //
    const userRooms = await pool.query(
      'INSERT INTO user_rooms (user_id, room_id) VALUES ($1, $2) RETURNING *',
      [userId, roomId]
    );

    return userRooms.rows[0];
  } catch (error) {
    return error;
  }
};

module.exports = { joinRoom };
