const express = require('express');
const router = express.Router();
const Meal = require('../Models/Meal');

router.post('/', async (req, res) => {
  await Meal.create(req.body);
  res.json({ success: true });
});

router.get('/:username', async (req, res) => {
  const meals = await Meal.find({ username: req.params.username });
  res.json(meals);
});

module.exports = router;
