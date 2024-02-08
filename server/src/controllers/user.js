const pool = require('../db/pool');

/**
 * @desc     Get User
 * @route    GET /api/user
 * @access   Public
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

module.exports = { getUser };
