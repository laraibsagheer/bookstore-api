 const cors = require('cors');
 const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const bookRoutes = require('./routes/bookRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/books', bookRoutes);

// Home route
app.get('/', (req, res) => {
  res.json({ message: 'Bookstore API is running!' });
});

// MongoDB connect + Server start
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 10000,
  family: 4
})
  .then(() => {
    console.log('✅ MongoDB Connected!');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Connection failed:', err.message);
  });