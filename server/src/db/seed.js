const pool = require('./pool');
const bcrypt = require('bcrypt');

const user1 = {
  username: 'user1',
  password: 'password',
};

const roomsData = [
  {
    name: 'JavaScript',
    description: 'You can discuss anything about JavaScript here',
  },
  {
    name: 'TypeScript',
    description: 'You can discuss anything about TypeScript here',
  },
  {
    name: 'Python',
    description: 'You can discuss anything about Python here',
  },
  {
    name: 'Java',
    description: 'You can discuss anything about Java here',
  },
  {
    name: 'C++',
    description: 'You can discuss anything about C++ here',
  },
  {
    name: 'PHP',
    description: 'You can discuss anything about PHP here',
  },
  {
    name: 'React',
    description: 'You can discuss anything about React here',
  },
];

const insertData = async () => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user1.password, salt);

    user1.password = hashedPassword;

    const user = await pool.query(
      'INSERT INTO users (username, hashed_password) VALUES ($1, $2) RETURNING *',
      [user1.username, user1.password]
    );

    // Insert rooms
    await Promise.all(
      roomsData.map(async (room) => {
        const createdRoom = await pool.query(
          'INSERT INTO rooms (name, description, created_user_id) VALUES ($1, $2, $3) RETURNING *',
          [room.name, room.description, user.rows[0].id]
        );

        // Add room to user's rooms
        await pool.query(
          'UPDATE users SET rooms = array_append(rooms, $1) WHERE id = $2',
          [createdRoom.rows[0].id, user.rows[0].id]
        );
      })
    );

    console.log('Seeding Completed!');
    pool.end();
  } catch (err) {
    console.error('Failed seeding data', err);
  }
};

insertData();

module.exports;
