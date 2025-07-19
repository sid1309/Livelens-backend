const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User'); 
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

//signup route
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;//Extract username and password from the incoming POST request
  try {
    const exitingUser = await User.findOne({ username });
    if (exitingUser) 
      {return res.status(409).json({ message: 'User already exists' });}
    
    const newUser = new User({ username, password}); //new user
    await newUser.save(); //Because of your User schema’s pre-save hook, password will be hashed before saving.
    res.status(201).json({ message: 'User registered' });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if(!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });//token for 1 hr, returned to frontend for auth 
    res.json({ token });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'login failed' });
  }
});

module.exports = router;
//When the backend sends a JWT token after login
//frontend need to store that token and use it in future requests to prove the user is logged in.
//HTTP requests can have headers — metadata you send with your request.
//We use the Authorization header to securely send the token with each request so that the backend knows who is making the request.
//On logout, the user's token is deleted on the frontend (client side).

