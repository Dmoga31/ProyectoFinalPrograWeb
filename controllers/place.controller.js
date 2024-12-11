const PlaceClass = require('../classes/Place.js'); // Asumiendo que tu clase está en 'services/place.service.js'

class PlaceController {

    // Obtener todos los lugares
    static async getAllPlaces(req, res) {
        try {
            const places = await PlaceClass.getPlaces();
            res.status(200).json(places);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Obtener un lugar por ID
    static async getPlaceById(req, res) {
        try {
            const place = await PlaceClass.getPlaceById(req.params.id);
            if (!place) {
                return res.status(404).json({ message: 'Place not found' });
            }
            res.status(200).json(place);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

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
    static async createPlace(req, res) {
        try {
            const place = await PlaceClass.createPlace(req.body);
            res.status(201).json(place);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Actualizar un lugar
    static async updatePlace(req, res) {
        try {
            const place = await PlaceClass.updatePlace(req.params.id, req.body);
            if (!place) {
                return res.status(404).json({ message: 'Place not found' });
            }
            res.status(200).json(place);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Eliminar un lugar
    static async deletePlace(req, res) {
        try {
            const place = await PlaceClass.deletePlace(req.params.id);
            if (!place) {
                return res.status(404).json({ message: 'Place not found' });
            }
            res.status(200).json({ message: 'Place deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = PlaceController;
