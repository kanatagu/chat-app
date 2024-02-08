const express = require('express');
const router = express.Router();
const { getUser } = require('../controllers/user');
const verifyToken = require('../utils/verifyToken');

router.get('/', verifyToken, getUser);

module.exports = router;
