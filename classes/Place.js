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

    // Obtener un lugar por el nombre
    // Obtener un lugar por su nombre
static async getPlaceByName(req, res) {
    try {
        const place = await PlaceClass.getPlaceByName(req.params.name);
        if (!place) {
            return res.status(404).json({ message: 'Place not found' });
        }
        res.status(200).json(place);
    } catch (error) {
        res.status(500).json({ message: error.message });
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
