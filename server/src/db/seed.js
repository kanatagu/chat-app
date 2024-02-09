const pool = require('./pool');
const bcrypt = require('bcrypt');

const admin = {
  username: 'admin',
  password: 'password',
  image_icon: null,
};

const testUser = {
  username: 'test_user',
  password: 'password',
  image_icon: null,
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
    name: 'PHP',
    description: 'You can discuss anything about PHP here',
  },
  {
    name: 'React',
    description: 'You can discuss anything about React here',
  },
  {
    name: 'General',
    description: 'This is a general room for anything you want to discuss',
  },
];

const insertData = async () => {
  try {
    const salt = await bcrypt.genSalt();
    const adminHashedPassword = await bcrypt.hash(admin.password, salt);
    const testUserHashedPassword = await bcrypt.hash(testUser.password, salt);

    admin.password = adminHashedPassword;
    testUser.password = testUserHashedPassword;

    const createdAdmin = await pool.query(
      'INSERT INTO users (username, hashed_password, image_icon) VALUES ($1, $2, $3) RETURNING *',
      [admin.username, admin.password, null]
    );

    const createdTestUser = await pool.query(
      'INSERT INTO users (username, hashed_password, image_icon) VALUES ($1, $2, $3) RETURNING *',
      [testUser.username, testUser.password, null]
    );

    // Insert rooms
    await Promise.all(
      roomsData.map(async (room) => {
        // Create room by admin
        const createdRoom = await pool.query(
          'INSERT INTO rooms (name, description, created_user_id) VALUES ($1, $2, $3) RETURNING *',
          [room.name, room.description, createdAdmin.rows[0].id]
        );

        // Insert user_rooms table
        await pool.query(
          'INSERT INTO user_rooms (user_id, room_id) VALUES ($1, $2)',
          [createdAdmin.rows[0].id, createdRoom.rows[0].id]
        );

        await pool.query(
          'INSERT INTO user_rooms (user_id, room_id) VALUES ($1, $2)',
          [createdTestUser.rows[0].id, createdRoom.rows[0].id]
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
