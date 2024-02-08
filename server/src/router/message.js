const express = require('express');
const router = express.Router();
const {
  getMessages,
  createMessage,
  updateMessage,
  deleteMessage,
} = require('../controllers/message');
const verifyToken = require('../utils/verifyToken');

router.get('/', verifyToken, getMessages);
router.post('/', verifyToken, createMessage);
router.put('/:id', verifyToken, updateMessage);
router.delete('/:id', verifyToken, deleteMessage);

module.exports = router;
