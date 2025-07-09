const mongoose = require('mongoose');
const WorkoutSchema = new mongoose.Schema({
  username: String,
  type: String,
  duration: Number,
  calories: Number,
  date: String
});
module.exports = mongoose.model('Workout', WorkoutSchema);
