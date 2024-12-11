const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({  
    NamePlace: {  
        type: String,  
        required: [true, 'Name is required'],  
        trim: true,  
        unique: true // Si quieres nombres únicos  
    },  
    Floor: {  
        type: String,  
        required: [true, 'Floor is required'],  
        trim: true  
    }  
}, {  
    timestamps: true // Añade createdAt y updatedAt  
});  
const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
