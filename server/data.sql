CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(30) NOT NULL,
  hashed_password VARCHAR(30) NOT NULL
  rooms INTEGER[] DEFAULT '[]'
);

CREATE TABLE rooms (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL
  created_user_id INTEGER REFERENCES users(id)
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  message VARCHAR(800) NOT NULL,
  user_id INTEGER REFERENCES users(id),
  room_id INTEGER REFERENCES rooms(id)
);
