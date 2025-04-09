const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/', authRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});