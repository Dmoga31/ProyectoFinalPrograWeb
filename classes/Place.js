const Place = require('../models/place.model');

class PlaceClass {
    // Obtener todos los lugares
    static async getPlaces() {
        try {
            return await Place.find({});
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Obtener un lugar por ID
    static async getPlaceById(id) {
        try {
            return await Place.findById(id);
        } catch (error) {
            throw new Error(error.message);
        }
    }

// En PlaceClass  
static async getPlaceByName(name) {  
        try {  
            return await Place.findOne({   
                NamePlace: { $regex: new RegExp(name, 'i') }   
            });  
        } catch (error) {  
            throw new Error(error.message);  
        }  
    } 

    // Crear un nuevo lugar
    static async createPlace(data) {
        try {
            const { NamePlace, Floor } = data;
            const place = new Place({ NamePlace, Floor });
            return await place.save();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Actualizar un lugar
    static async updatePlace(id, data) {
        try {
            return await Place.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Eliminar un lugar
    static async deletePlace(id) {
        try {
            return await Place.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = PlaceClass;
