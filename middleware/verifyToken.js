const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key_here';
const logger = require('../utils/logger');

module.exports = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    logger.warn('Token missing in request');
    return res.status(401).json({ error: 'Token missing' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      logger.warn('Invalid token attempt');
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};
