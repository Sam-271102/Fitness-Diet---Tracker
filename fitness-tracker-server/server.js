const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User.');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // for parsing application/json

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Signup API
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }
    const newUser = new User({ username, email, password }); // Hash password in real app!
    await newUser.save();
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Login API
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }
  try {
    const user = await User.findOne({ email, password }); // Hash & compare password in real app!
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({ username: user.username, email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
