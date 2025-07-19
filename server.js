const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const bookmarkRoutes = require('./routes/bookmarks');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/bookmarks', bookmarkRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,useUnifiedTopology: true})
  .then(()=>app.listen(5000,()=> console.log('Server running on port 5000')))
  .catch(err => console.error('MongoDB connection error:', err));
  
  //cors-	Enables Cross-Origin Resource Sharing (important when frontend and backend run on different ports or domains)