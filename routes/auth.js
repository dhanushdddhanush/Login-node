const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user'); 

const verifyToken = require('../middleware/verifyToken');

const SECRET_KEY = 'your_secret_key_here';

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    await User.create({ username, password });
    res.json({ message: 'Registered successfully' });
  } catch {
    res.status(500).json({ error: 'Username might already exist' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username, password } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ username: user.username }, SECRET_KEY);
  res.json({ token });
});

router.get('/dashboard', verifyToken, (req, res) => {
  res.json({ message: `Welcome, ${req.user.username}!` });
});

module.exports = router;
