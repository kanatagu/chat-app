const pool = require('../../db/pool');

/**
 * @desc     Get User
 * @route    GET /api/user
 * @access   Private
 */
const getUser = async (req, res) => {
  try {
    const { id: userId } = req.user;

    const user = await pool.query(
      'SELECT id, username, image_icon FROM users WHERE id = $1',
      [userId]
    );
    return res.status(200).json(user.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc     Update user
 * @route    PUT /api/user
 * @access   Private
 */
const updateUser = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { username, image_icon } = req.body;

    if (!username) throw new Error('Username is required');

    const user = await pool.query(
      'UPDATE users SET username = $1, image_icon = $2 WHERE id = $3 RETURNING *',
      [username, image_icon, userId]
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

    const joinedRooms = await pool.query(
      'SELECT * FROM rooms JOIN user_rooms ON rooms.id = user_rooms.room_id WHERE user_rooms.user_id = $1',
      [userId]
    );

    return res.status(200).json(joinedRooms.rows);
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

    // Check if the user already joined the room
    const joinedRoom = await pool.query(
      'SELECT * FROM user_rooms WHERE user_id = $1 AND room_id = $2',
      [userId, roomId]
    );

    if (!joinedRoom.rows[0]) throw new Error('User not joined the room');

    const removedRoom = await pool.query(
      'DELETE FROM user_rooms WHERE user_id = $1 AND room_id = $2 RETURNING *',
      [userId, roomId]
    );

    if (!removedRoom.rows[0]) throw new Error('Failed to remove room');

    return res.status(200).json(removedRoom.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUser, updateUser, getJoinedRooms, removeRoom };
