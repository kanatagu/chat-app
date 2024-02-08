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

  try {
    // Validation Check
    await validateForm(authSchema, req.body);

    // Bcrypt password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json('User already exists');
    }

    // Insert user into db
    const newUser = await pool.query(
      'INSERT INTO users (username, hashed_password) VALUES ($1, $2) RETURNING *',
      [username, hashedPassword]
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

    return res.status(201).json({
      id: newUser.rows[0].id,
      username: newUser.rows[0].username,
      rooms: newUser.rows[0].rooms,
    });
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
      return res.status(400).json('Invalid Credentials');
    }

    const matchPassword = await bcrypt.compare(
      password,
      user.rows[0].hashed_password
    );

    if (!matchPassword) {
      return res.status(400).json('Invalid Credentials');
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
      return res.status(400).json(error.message);
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
};

module.exports = {
  register,
  login,
};
