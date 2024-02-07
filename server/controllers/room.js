const pool = require('../db');
const validateForm = require('../utils/validateForm');
const { roomSchema } = require('../schema/room');

/**
 * @desc     Get room
 * @route    GET /api/rooms
 * @access   Public
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
 * @access   Public
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

    // Add room to user's rooms
    const user = await client.query(
      'UPDATE users SET rooms = array_append(rooms, $1) WHERE id = $2 RETURNING *',
      [roomId, userId]
    );

    if (!user.rows[0]) throw new Error('Failed to update user rooms');

    await client.query('COMMIT');

    res.status(201).json(newRoom.rows[0]);
  } catch (error) {
    console.error('error', error);
    await client.query('ROLLBACK');

    // Validation Error
    if (error.validationError) {
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
 * @access   Public
 */
const updateRoom = async (req, res) => {
  try {
    // Validation Check
    await validateForm(roomSchema, req.body);

    const { name, description } = req.body;
    const { id: roomId } = req.params;
    const { id: userId } = req.user;

    // Update Room
    const updateRoom = await pool.query(
      'UPDATE rooms SET name = $1, description = $2 WHERE id = $3 RETURNING *',
      [name, description, roomId]
    );

    res.status(200).json(updateRoom.rows[0]);
  } catch (error) {
    // Validation Error
    if (error.validationError) {
      return res.status(400).json(error.message);
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
};

/**
 * @desc     Delete room
 * @route    DELETE /api/rooms/:id
 * @access   Public
 */
const deleteRoom = async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const { id: roomId } = req.params;
    const { id: userId } = req.user;

    // Only the user who created the room can delete it
    const room = await client.query(
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
    const deletedRoom = await client.query(
      'DELETE FROM rooms WHERE id = $1 RETURNING *',
      [roomId]
    );

    const deleteRoomFromUser = await client.query(
      'UPDATE users SET rooms = array_remove(rooms, $1) WHERE id = $2 RETURNING *',
      [roomId, userId]
    );

    if (!deleteRoomFromUser.rows[0]) throw new Error('Failed to delete rooms');

    await client.query('COMMIT');
    res.status(200).json(deletedRoom.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    return res.status(500).json({ message: error.message });
  } finally {
    client.release();
  }
};

module.exports = { getRooms, createRoom, updateRoom, deleteRoom };
