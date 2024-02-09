const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db/pool');
const validateForm = require('../utils/validateForm');
const { authSchema } = require('../schema/auth');

/**
 * @desc     Register user
 * @route    POST /api/auth/register
 * @access   Public
 */
const register = async (req, res) => {
  const { username, password } = req.body;
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Validation Check
    await validateForm(authSchema, req.body);

    // Bcrypt password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Check if user already exists
    const existingUser = await client.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Insert user into db with array of rooms
    const newUser = await client.query(
      'INSERT INTO users (username, hashed_password) VALUES ($1, $2) RETURNING *',
      [username, hashedPassword]
    );

    // Get rooms created by admin
    const adminUserId = await client.query(
      'SELECT id FROM users WHERE username = $1',
      ['admin']
    );

    const defaultRooms = await client.query(
      'SELECT id FROM rooms WHERE created_user_id = $1',
      [adminUserId.rows[0].id]
    );

    // Insert default rooms data to user_rooms table
    await Promise.all(
      defaultRooms.rows.map((room) =>
        client.query(
          'INSERT INTO user_rooms (user_id, room_id) VALUES ($1, $2)',
          [newUser.rows[0].id, room.id]
        )
      )
    );

    const token = jwt.sign(
      { id: newUser.rows[0].id, username: newUser.rows[0].username },
      `${process.env.JWT_SECRET_KEY}`,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    // Set cookie
    res.cookie('token', token, {
      secure: true,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24H
    });

    await client.query('COMMIT');

    return res.status(201).json({
      id: newUser.rows[0].id,
      username: newUser.rows[0].username,
      rooms: newUser.rows[0].rooms,
    });
  } catch (error) {
    await client.query('ROLLBACK');

    // Validation Error
    if (error.validationError) {
      return res.status(400).json({ message: error.message });
    } else {
      return res.status(500).json({ message: error.message });
    }
  } finally {
    client.release();
  }
};

/**
 * @desc     Login User
 * @route    POST /api/auth/login
 * @access   Public
 */
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Validation Check
    await validateForm(authSchema, req.body);

    // Check username and password match
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [
      username,
    ]);

    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const matchPassword = await bcrypt.compare(
      password,
      user.rows[0].hashed_password
    );

    if (!matchPassword) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const token = jwt.sign(
      { id: user.rows[0].id, username: user.rows[0].username },
      `${process.env.JWT_SECRET_KEY}`,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    // Set cookie
    res.cookie('token', token, {
      secure: true,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24H
    });

    return res.status(200).json({
      id: user.rows[0].id,
      username: user.rows[0].username,
      rooms: user.rows[0].rooms,
    });
  } catch (error) {
    // Validation Error
    if (error.validationError) {
      return res.status(400).json({ message: error.message });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
};

/**
 * @desc     Logout user
 * @route    GET /api/auth/logout
 * @access   Public
 */
const logout = (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({ message: 'Logout successfully' });
};

module.exports = {
  register,
  login,
  logout,
};
