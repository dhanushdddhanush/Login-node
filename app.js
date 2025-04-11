const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./db');
const authRoutes = require('./routes/auth');

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);

sequelize.authenticate().then(() => {
  console.log('DB connected');
  app.listen(3000, () => console.log('Server running on http://localhost:3000'));
}).catch(err => console.error('DB error', err));
