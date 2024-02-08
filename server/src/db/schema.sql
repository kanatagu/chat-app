DROP TABLE IF EXISTS users cascade;
DROP TABLE IF EXISTS rooms cascade;
DROP TABLE IF EXISTS messages cascade;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(30) NOT NULL,
  hashed_password VARCHAR(80) NOT NULL,
  rooms INTEGER[] DEFAULT '{}'
);

CREATE TABLE rooms (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  description VARCHAR(100),
  created_user_id INTEGER REFERENCES users(id)
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  message VARCHAR(1000) NOT NULL,
  user_id INTEGER REFERENCES users(id),
  room_id INTEGER REFERENCES rooms(id)
);
