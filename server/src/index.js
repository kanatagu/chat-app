const express = require('express');
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const pool = require('./db/pool');
const authRouter = require('./router/auth');
const roomRouter = require('./router/room');
const userRouter = require('./router/user');
const messageRouter = require('./router/message');
const { socketIoHandler } = require('./socket');

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    allowedHeaders: [
      'set-cookie',
      'Content-Type',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Credentials',
    ],
  })
);
app.use(express.json());

// Parse cookies object
app.use(cookieParser(process.env.JWT_EXPIRES_IN));

app.get('/', async (req, res) => {
  try {
    const users = await pool.query('SELECT * FROM users');
    res.json(users.rows);
  } catch (err) {
    res.status(500).send(err.message || 'Server Error');
    console.error(err);
  }
});

// Router
app.use('/api/auth', authRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/user', userRouter);
app.use('/api/messages', messageRouter);

// Socket.io
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
});

socketIoHandler(io);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
