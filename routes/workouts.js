const express = require('express');
const mongoose = require('mongoose');  // Add this line to import mongoose

const router = express.Router();

// Import all controller functions
const {
    getAllWorkouts,
    getSingleWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController');

// GET all workouts
router.get('/', getAllWorkouts);

// GET single workout by ID
router.get('/:id', getSingleWorkout);

// POST (create) a new workout
router.post('/', createWorkout);

// DELETE a workout by ID
router.delete('/:id', deleteWorkout);

// PATCH (update) a workout by ID
router.patch('/:id', updateWorkout);

module.exports = router;
