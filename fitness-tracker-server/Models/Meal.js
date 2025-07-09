const mongoose = require('mongoose');
const MealSchema = new mongoose.Schema({
  username: String,
  meal_type: String,
  calories: Number,
  date: String
});
module.exports = mongoose.model('Meal', MealSchema);
