
const dns = require('dns');

if (process.env.NODE_ENV !== 'production') {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
}

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
// Middleware
// Allow requests from the Vite frontend
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🚀 Connected securely to Cyber-Grid Database (MongoDB)'))
  .catch((err) => console.error('❌ Database Connection Error:', err));

// Routes
// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/careers', require('./src/routes/careerRoutes'));
app.use('/api/contact', require('./src/routes/contactRoutes'));
// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`⚡ Server operating on port ${PORT}`);
});