const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');


// Get all workouts
const getAllWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({}).sort({ createdAt: -1 });  // Fetch all workouts sorted by creation time
        res.status(200).json(workouts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single workout by ID
const getSingleWorkout = async (req, res) => {
    const { id } = req.params;

    // Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid workout ID' });
    }

    try {
        const workout = await Workout.findById(id);

        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }

        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Create a new workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;

    // Validation: Check if all fields are provided
    if (!title || !load || !reps) {
        return res.status(400).json({ error: 'Please fill in all fields' });
    }

    try {
        const workout = await Workout.create({ title, load, reps });
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a workout by ID
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    // Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid workout ID' });
    }

    try {
        const workout = await Workout.findOneAndDelete({ _id: id });

        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }

        res.status(200).json({ message: 'Workout deleted successfully', workout });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a workout by ID
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    // Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid workout ID' });
    }

    try {
        const workout = await Workout.findByIdAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true, runValidators: true } // Return updated workout and validate
        );

        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }

        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getAllWorkouts,
    getSingleWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
};
