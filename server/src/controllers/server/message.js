const pool = require('../../db/pool');

/**
 * @desc Create Message
 */
const createMessage = async (message, userId, roomId) => {
  console.log('createMessage!', message, userId, roomId);
  try {
    // Room Check
    const room = await pool.query('SELECT * FROM rooms WHERE id = $1', [
      roomId,
    ]);

    if (!room.rows[0]) {
      throw new Error('Room not found');
    }

    // Create message
    const newMessage = await pool.query(
      'INSERT INTO messages (message, user_id, room_id) VALUES ($1, $2, $3) RETURNING *, (SELECT username FROM users WHERE id = $2) AS username, (SELECT image_icon FROM users WHERE id = $2) AS image_icon',
      [message, userId, roomId]
    );

    return newMessage.rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { createMessage };
