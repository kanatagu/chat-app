const jwt = require('jsonwebtoken');
const pool = require('../db/pool');

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ token: null });
    }

    const verified = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);

    if (!verified || typeof verified !== 'object') {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Check DB for user
    const user = await pool.query(
      'SELECT id, username FROM users WHERE id = $1',
      [verified.id]
    );

    if (!user.rows[0]) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = {
      id: user.rows[0].id,
      username: user.rows[0].username,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = verifyToken;
