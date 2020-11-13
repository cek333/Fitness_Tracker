const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  type: {
    type: String,
    enum: ['resistance', 'cardio']
  },
  name: {
    type: String,
    trim: true,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  weight: Number,
  reps: Number,
  sets: Number,
  distance: Number
});

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [ExerciseSchema]
});

WorkoutSchema
.virtual('totalDuration')
.get(function () {
  return this.exercises.reduce((acc, curr) => acc + curr.duration, 0);
});
WorkoutSchema.set('toJSON', { getters: true, virtuals: true });
WorkoutSchema.set('toObject', { getters: true, virtuals: true });

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
