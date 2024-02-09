const express = require('express');
const router = express.Router();
const {
  getUser,
  getJoinedRooms,
  joinRoom,
  removeRoom,
} = require('../controllers/user');
const verifyToken = require('../utils/verifyToken');

router.get('/', verifyToken, getUser);
router.get('/rooms', verifyToken, getJoinedRooms);
router.post('/rooms/:id/join', verifyToken, joinRoom);
router.post('/rooms/:id/remove', verifyToken, removeRoom);

module.exports = router;
