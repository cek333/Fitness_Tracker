const db = require('../models');
const express = require('express');
const router = express.Router();

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

router.get('/api/workouts', async function(req, res){
  let result = await db.Workout.find({});
  console.log('[get /api/workouts]', result);
  res.json(result);
});

router.get('/api/workouts/range', async function(req, res){
  let result = await db.Workout.find({}).sort({day: -1}).limit(7).exec();
  console.log('[get /api/workouts/range]', result);
  res.json(result);
});

router.post('/api/workouts', async function(req, res) {
  console.log('[post /api/workouts]', req.body);
  // Note: if req.body empty (typical case), no harm done
  let result = await db.Workout.create({ exercise: [ req.body ] });
  console.log(`[post /api/workouts] insertId=${result.insertId}`, result);
  res.json(result);
});

router.put('/api/workouts/:id', async function(req, res) {
  console.log(`[put /api/workouts/:id] id=${req.params.id}`, req.body);
  let workout = await db.Workout.findById(req.params.id);
  workout.exercises.push(req.body);
  let result = await workout.save();
  console.log(`[post /api/workouts/:id]`, result);
  res.json(result);
});

module.exports = router;