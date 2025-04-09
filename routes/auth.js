const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const pool = require('../db');
const verifyToken = require('../middleware/verifyToken');

const SECRET_KEY = 'your_secret_key_here';

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password]);
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Username might already exist' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ username: user.username }, SECRET_KEY);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.get('/dashboard', verifyToken, (req, res) => {
  res.json({ message: `Welcome, ${req.user.username}! You accessed a protected route.` });
});

module.exports = router;