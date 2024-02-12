const express = require('express');
const router = express.Router();
const {
  getRooms,
  getRoomDetails,
  createRoom,
  updateRoom,
  deleteRoom,
} = require('../controllers/cllient/room');
const verifyToken = require('../utils/verifyToken');

router.get('/', getRooms);
router.get('/:id', getRoomDetails);
router.post('/', verifyToken, createRoom);
router.put('/:id', verifyToken, updateRoom);
router.delete('/:id', verifyToken, deleteRoom);

module.exports = router;
