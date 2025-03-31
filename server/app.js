const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const pool = require('./db/index'); 

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
pool.connect()
  .then(() => {
    console.log('✅ Connected to PostgreSQL');
  })
  .catch((err) => {
    console.error('❌ Failed to connect to PostgreSQL:', err.message);
  });

// Routes
const customerRoutes = require('./routes/customerRoutes');
const roomRoutes = require('./routes/roomRoutes');

app.use('/api/customers', customerRoutes);
app.use('/api/rooms', roomRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('🌐 Backend is running!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});