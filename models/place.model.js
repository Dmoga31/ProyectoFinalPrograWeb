const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    NamePlace: {
        type: String,
        required: true,
        trim: true
    },
    Floor: {
        type: String,
        required: true,
        trim: true
    }
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
