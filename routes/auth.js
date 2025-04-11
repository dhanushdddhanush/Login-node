const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const verifyToken = require('../middleware/verifyToken');
const logger = require('../utils/logger');

const SECRET_KEY = 'your_secret_key_here';

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    await User.create({ username, password });
    logger.info(`User registered: ${username}`);
    res.json({ message: 'Registered successfully' });
  } catch (err) {
    logger.error(`Registration failed for ${username}: ${err.message}`);
    res.status(500).json({ error: 'Username might already exist' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username, password } });
    if (!user) {
      logger.warn(`Invalid login attempt for username: ${username}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ username: user.username }, SECRET_KEY);
    logger.info(`User logged in: ${username}`);
    res.json({ token });
  } catch (err) {
    logger.error(`Login error for ${username}: ${err.message}`);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.get('/dashboard', verifyToken, (req, res) => {
  logger.info(`Dashboard accessed by: ${req.user.username}`);
  res.json({ message: `Welcome, ${req.user.username}!` });
});

module.exports = router;
