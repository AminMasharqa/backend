require('dotenv').config()
const express = require('express');

// express app 
const app = express();

const mongoose = require('mongoose');

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// import workout routes
const workoutRoutes = require('./routes/workouts');

// routes
app.use('/api/workouts', workoutRoutes);

mongoose.connect(process.env.MONG_URI)
    .then(() =>{


        // listen for requests
        app.listen(process.env.PORT || 4000, () => {
            console.log(`connected to db & Listening on port ${process.env.PORT || 4000}...`);
        });


    })
    .catch((error)=>{
        console.log(error)
    })

