const express = require('express');
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const auth = require('./router/auth');
const rooms = require('./router/room');
const pool = require('./db');

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

app.use(cors());
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
app.use('/api/auth', auth);
app.use('/api/rooms', rooms);

// Socket.io
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
});

// Run socketIo when client connects
io.on('connect', (socket) => {
  console.log(`Client connected with id: ${socket.id}`);
  socket.on('disconnect', () =>
    console.log(`Client disconnected with id: ${socket.id}`)
  );
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
