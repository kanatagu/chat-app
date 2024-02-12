const express = require('express');
const router = express.Router();
const {
  getMessages,
  updateMessage,
  deleteMessage,
} = require('../controllers/cllient/message');
const verifyToken = require('../utils/verifyToken');

router.get('/', verifyToken, getMessages);
router.put('/:id', verifyToken, updateMessage);
router.delete('/:id', verifyToken, deleteMessage);

module.exports = router;
