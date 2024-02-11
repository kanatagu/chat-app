const express = require('express');
const router = express.Router();
const {
  getUser,
  updateUser,
  getJoinedRooms,
  joinRoom,
  removeRoom,
} = require('../controllers/cllient/user');
const verifyToken = require('../utils/verifyToken');

router.get('/', verifyToken, getUser);
router.put('/', verifyToken, updateUser);
router.get('/rooms', verifyToken, getJoinedRooms);
router.post('/rooms/:id/join', verifyToken, joinRoom);
router.post('/rooms/:id/remove', verifyToken, removeRoom);

module.exports = router;
