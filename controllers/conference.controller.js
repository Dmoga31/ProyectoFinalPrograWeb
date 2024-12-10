const ConferenceClass = require('../classes/Conference.js');
const PlaceClass = require('../classes/Place.js');

class ConferenceController {
    static async getConferences(req, res) {
        try {
            const userId = req.user._id; // Obtenido del middleware `verifyToken`
            const isAdmin = req.user.IsAdmin; 
            console.log("Is admin? -> ", isAdmin);
            const conferences = await ConferenceClass.getConferences(userId, isAdmin);
            res.status(200).json(conferences);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getConferenceById(req, res) {
        try {
            const { id } = req.params; // ID de la conferencia desde los parámetros
            const userId = req.user._id; // ID del usuario autenticado
            const isAdmin = req.user.IsAdmin; // Indicador de si es administrador
    
            // Obtener la conferencia
            const conference = await ConferenceClass.getConferenceById(id, userId, isAdmin);
    
            if (!conference) {
                return res.status(404).json({ message: 'Conference not found or not authorized' });
            }
    
            res.status(200).json(conference);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    

    static async createConference(req, res) {
        try {
            const { Name, Place, Date, StartHour, EndHour } = req.body;
            
            // Intentar buscar el lugar primero por nombre
            let place = await PlaceClass.getPlaceById(Place); // Aquí buscamos por ID

            console.log(place)
    
            if (!place) {
                return res.status(404).json({ message: 'Place not found' });
            }
    
            // Crear la conferencia
            const conference = await ConferenceClass.createConference({
                Name,
                Place: place._id,  // Usamos el ID del lugar encontrado
                Date,
                StartHour,
                EndHour,
                CreatedBy: req.user._id
            });
    
            // Enviar la respuesta con la conferencia creada
            res.status(201).json(conference);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    

    static async updateConference(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const userId = req.user._id;
            const isAdmin = req.user.IsAdmin; // Indicador de si es administrador
    
            // Actualizar la conferencia
            const conference = await ConferenceClass.updateConference(id, data, userId, isAdmin);
    
            if (!conference) {
                return res.status(404).json({ message: 'Conference not found or not authorized' });
            }
    
            res.status(200).json(conference);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    

    static async deleteConference(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user._id;
            const isAdmin = req.user.IsAdmin; // Indicador de si es administrador
    
            // Eliminar la conferencia
            const conference = await ConferenceClass.deleteConference(id, userId, isAdmin);
    
            if (!conference) {
                return res.status(404).json({ message: 'Conference not found or not authorized' });
            }
    
            res.status(200).json({ message: 'Conference deleted successfully', conference });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = ConferenceController;
