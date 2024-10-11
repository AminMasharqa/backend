const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Enhanced Workout Schema
const workoutSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [3, 'Title must be at least 3 characters long'],
    trim: true  // Removes surrounding spaces
  },
  reps: {
    type: Number,
    required: [true, 'Reps are required'],
    min: [1, 'Reps must be at least 1'], // Ensures reps are greater than or equal to 1
    validate: {
      validator: Number.isInteger,  // Validates that reps is an integer
      message: 'Reps must be an integer'
    }
  },
  load: {
    type: Number,
    required: [true, 'Load is required'],
    min: [0, 'Load must be 0 or positive value'],  // Ensures load is a positive number
    validate: {
      validator: Number.isInteger,  // Validates that load is an integer
      message: 'Load must be an integer'
    }
  }
}, { 
  timestamps: true  // Enables createdAt and updatedAt fields
});

// Example of an instance method
workoutSchema.methods.isHeavy = function () {
  return this.load > 100;  // A simple method to check if the workout is "heavy"
};

// Example of a static method (you can create your own logic)
workoutSchema.statics.findByTitle = async function (title) {
  return await this.findOne({ title: new RegExp(title, 'i') }); // Case-insensitive search
};

// Optional: Pre-save hook for handling data before saving (e.g., hashing sensitive fields)
workoutSchema.pre('save', async function (next) {
  // If needed, handle password hashing or other sensitive fields here.
  // This is just an example if you plan to add a password field or something similar.
  // if (this.isModified('password')) {
  //   const salt = await bcrypt.genSalt(10);
  //   this.password = await bcrypt.hash(this.password, salt);
  // }
  
  next();
});

module.exports = mongoose.model('Workout', workoutSchema);
