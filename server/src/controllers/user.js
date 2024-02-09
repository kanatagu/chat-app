const pool = require('../db/pool');

/**
 * @desc     Get User
 * @route    GET /api/user
 * @access   Private
 */
const getUser = async (req, res) => {
  try {
    const { id: userId } = req.user;

    const user = await pool.query(
      'SELECT id, username, rooms FROM users WHERE id = $1',
      [userId]
    );
    return res.status(200).json(user.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc     Get User's joined rooms
 * @route    GET /api/user/rooms
 * @access   Private
 */
const getJoinedRooms = async (req, res) => {
  try {
    const { id: userId } = req.user;
    console.log('req.user', req.user);

    const joinedRooms = await pool.query(
      'SELECT * FROM rooms JOIN user_rooms ON rooms.id = user_rooms.room_id WHERE user_rooms.user_id = $1',
      [userId]
    );

    console.log('joinedRooms', joinedRooms);

    // const user = await pool.query('SELECT rooms FROM users WHERE id = $1', [
    //   userId,
    // ]);

    // const roomsArray = await pool.query(
    //   'SELECT * FROM rooms WHERE id = ANY($1)',
    //   [user.rows[0].rooms]
    // );

    // return res.status(200).json(roomsArray.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc     Join room
 * @route    POST /api/user/rooms/:id/join
 * @access   Private
 */
const joinRoom = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { id: roomId } = req.params;

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

    const user = await pool.query(
      'UPDATE users SET rooms = array_append(rooms, $1) WHERE id = $2 RETURNING *',
      [roomId, userId]
    );

    if (!user.rows[0]) throw new Error('Failed to update user rooms');

    return res.status(200).json(user.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc     Remove room
 * @route    POST /api/user/rooms/:id/remove
 * @access   Private
 */
const removeRoom = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { id: roomId } = req.params;

    // Check if the room exists
    const room = await pool.query('SELECT * FROM rooms WHERE id = $1', [
      roomId,
    ]);

    if (!room.rows[0]) throw new Error('Room not found');

    const user = await pool.query(
      'UPDATE users SET rooms = array_remove(rooms, $1) WHERE id = $2 RETURNING *',
      [roomId, userId]
    );

    if (!user.rows[0]) throw new Error('Failed to remove room from user rooms');

    return res.status(200).json(user.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUser, getJoinedRooms, joinRoom, removeRoom };
