require('dotenv').config(); // Esto carga las variables de entorno desde el archivo .env

const express = require('express');
var cors = require('cors')

const mongoose = require( 'mongoose');
const app = express();
app.use(cors())
const userRoutes = require('./routes/user.route.js');
const conferenceRoutes = require('./routes/conference.route.js');
const placeRoutes = require('./routes/place.route.js');

// Middleware para manejar JSON
app.use(express.json());

// Usar las rutas para 'user' y 'conference'
app.use('/api/users', userRoutes);
app.use('/api/conferences', conferenceRoutes);
app.use('/api/places', placeRoutes);  // Rutas para lugares


app.get('/', (req, res) => {
    res.send('Hello Diego');
});

const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri)
.then(()=> {
    console.log("Connected to database");  
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
        console.log("JWT_SECRET:", process.env.JWT_SECRET);
    });
})
.catch((e) => {
    console.log(e);
    console.log("Connection failure");
});



