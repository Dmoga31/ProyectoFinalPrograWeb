const express = require('express');
const mongoose = require( 'mongoose');
const Conference = require('./models/conference.model.js')
const conferenceRoute = require("./routes/conference.route.js")
const app = express();


//Middleware
app.use(express.json());

//Routes
app.use("/api/conferences", conferenceRoute);


app.get('/', (req, res) => {
    res.send('Hello Diego');
});

mongoose.connect('mongodb://localhost:27017/')
.then(()=> {
    console.log("Connected to database");  
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
.catch(() => {
    console.log("Connection failure");
});



