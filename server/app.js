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
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const viewsRoutes = require('./routes/viewsRoutes'); 

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/views', viewsRoutes); 

// Health Check
app.get('/', (req, res) => {
  res.send('🌐 Backend is running!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});