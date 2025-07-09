const express = require('express');
const router = express.Router();
const User = require('../Models/User');

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const exists = await User.findOne({ username });
  if (exists) return res.json({ success: false, message: 'User already exists' });
  await User.create({ username, password });
  res.json({ success: true });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) res.json({ success: true });
  else res.json({ success: false });
});

module.exports = router;
