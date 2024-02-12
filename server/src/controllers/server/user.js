const pool = require('../../db/pool');

/**
 * @desc Get Admin UserId
 */
const getAdminUserId = async () => {
  try {
    const admin = await pool.query('SELECT id FROM users WHERE username = $1', [
      'admin',
    ]);
    return admin.rows[0].id;
  } catch (error) {
    return error;
  }
};

module.exports = { getAdminUserId };
