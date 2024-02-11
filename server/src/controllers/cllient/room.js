const pool = require('../../db/pool');
const validateForm = require('../../utils/validateForm');
const { roomSchema } = require('../../schema/room');

/**
 * @desc     Get rooms
 * @route    GET /api/rooms
 * @access   Private
 */
const getRooms = async (req, res) => {
  try {
    const rooms = await pool.query('SELECT * FROM rooms');
    res.status(200).json(rooms.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc     Create room
 * @route    POST /api/rooms
 * @access   Private
 */
const createRoom = async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Validation Check
    await validateForm(roomSchema, req.body);

    const { name, description } = req.body;
    const { id: userId } = req.user;

    // Create Room
    const newRoom = await client.query(
      'INSERT INTO rooms (name, description, created_user_id) VALUES ($1, $2, $3) RETURNING *',
      [name, description, userId]
    );

    const roomId = newRoom.rows[0].id;

    // Insert data to user_rooms table
    await client.query(
      'INSERT INTO user_rooms (user_id, room_id) VALUES ($1, $2)',
      [userId, roomId]
    );

    await client.query('COMMIT');

    res.status(201).json(newRoom.rows[0]);
  } catch (error) {
    console.error('error', error);
    await client.query('ROLLBACK');

    if (error.validationError) {
      // Validation Error
      return res.status(400).json(error.message);
    } else {
      return res.status(500).json({ message: error.message });
    }
  } finally {
    client.release();
  }
};

/**
 * @desc     Update room
 * @route    PUT /api/rooms/:id
 * @access   Private
 */
const updateRoom = async (req, res) => {
  try {
    // Validation Check
    await validateForm(roomSchema, req.body);

    const { name, description } = req.body;
    const { id: roomId } = req.params;

    // Update Room
    const updateRoom = await pool.query(
      'UPDATE rooms SET name = $1, description = $2 WHERE id = $3 RETURNING *',
      [name, description, roomId]
    );

    res.status(200).json(updateRoom.rows[0]);
  } catch (error) {
    if (error.validationError) {
      // Validation Error
      return res.status(400).json(error.message);
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
};

/**
 * @desc     Delete room
 * @route    DELETE /api/rooms/:id
 * @access   Private
 */
const deleteRoom = async (req, res) => {
  try {
    const { id: roomId } = req.params;
    const { id: userId } = req.user;

    // Only the user who created the room can delete it
    const room = await pool.query(
      'SELECT created_user_id FROM rooms WHERE id = $1',
      [roomId]
    );

    if (!room.rows[0]) {
      return res.status(400).json({ message: 'Room not found' });
    }

    if (room.rows[0].created_user_id !== userId) {
      return res
        .status(403)
        .json({ message: 'You are not authorized to delete this room' });
    }

    // // Delete Room
    const deletedRoom = await pool.query(
      'DELETE FROM rooms WHERE id = $1 RETURNING *',
      [roomId]
    );

    console.log('deletedRoom', deletedRoom);

    res.status(200).json(deletedRoom.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getRooms, createRoom, updateRoom, deleteRoom };
