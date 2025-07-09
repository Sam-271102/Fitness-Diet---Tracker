const express = require('express');
const router = express.Router();
const Workout = require('../Models/Workout');

router.post('/', async (req, res) => {
  await Workout.create(req.body);
  res.json({ success: true });
});

router.get('/:username', async (req, res) => {
  const workouts = await Workout.find({ username: req.params.username });
  res.json(workouts);
});

module.exports = router;
