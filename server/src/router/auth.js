const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/cllient/auth');

router.post('/login', login);
router.post('/register', register);
router.get('/logout', logout);

module.exports = router;
