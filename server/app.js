const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const pool = require('./db/index'); 

app.use(cors());
app.use(express.json());

pool.connect()
  .then(() => {
    console.log('✅ Connected to PostgreSQL');
  })
  .catch((err) => {
    console.error('❌ Failed to connect to PostgreSQL:', err.message);
  });

// Routes
app.get('/', (req, res) => {
  res.send('🌐 Backend is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});