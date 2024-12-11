const Conference = require('../models/conference.model');
const Place = require('../models/place.model')

class ConferenceClass {
    // Obtener todas las conferencias de un usuario
    static async getConferences(userId, isAdmin) {
        try {
            if (isAdmin) {
                return await Conference.find({}).populate('Place')  
                                .populate('CreatedBy', 'FirstName LastName')  
                                .sort({ Date: 1 }); // Opcional: ordenar por fecha
            } 
            return await Conference.find({ CreatedBy: userId }).populate('Place')
                        .populate('CreatedBy', 'FirstName LastName')  
                        .sort({ Date: 1 }); // Opcional: ordenar por fecha

        } catch (error) {
            throw new Error(error.message);
        }
    }

// Obtener una conferencia por ID
static async getConferenceById(id, userId, isAdmin) {
    try {
        // Si es administrador, puede acceder a cualquier conferencia
        if (isAdmin) {
            return await Conference.
            findById(id)
            .populate('Place')  
            .populate('CreatedBy', 'FirstName LastName'); // Agregamos populate para CreatedBy
        }

        // Si no es administrador, solo puede acceder a conferencias creadas por él mismo
        return await Conference.findOne({   
                        _id: id,   
                        CreatedBy: userId   
                    })  
                    .populate('Place')  
                    .populate('CreatedBy', 'FirstName LastName');
    } catch (error) {
        throw new Error(error.message);
    }
}

  // Método para verificar disponibilidad  
     static async checkAvailability(placeId, date, startHour, endHour, excludeConferenceId = null) {  
            try {  
                // Convertir la fecha a formato ISO para comparación  
                const conferenceDate = new Date(date).toISOString().split('T')[0];  
    
                // Buscar conferencias que se superpongan en tiempo y lugar  
                const query = {  
                    Place: placeId,  
                    Date: new Date(conferenceDate),  
                    $or: [  
                        // Caso 1: La nueva conferencia comienza durante otra conferencia  
                        {  
                            StartHour: { $lte: startHour },  
                            EndHour: { $gt: startHour }  
                        },  
                        // Caso 2: La nueva conferencia termina durante otra conferencia  
                        {  
                            StartHour: { $lt: endHour },  
                            EndHour: { $gte: endHour }  
                        },  
                        // Caso 3: La nueva conferencia engloba completamente a otra  
                        {  
                            StartHour: { $gte: startHour },  
                            EndHour: { $lte: endHour }  
                        }  
                    ]  
                };  
    
                // Si estamos actualizando una conferencia existente, excluirla de la búsqueda  
                if (excludeConferenceId) {  
                    query._id = { $ne: excludeConferenceId };  
                }  
    
                const conflictingConference = await Conference.findOne(query);  
    
                return !conflictingConference; // true si está disponible, false si hay conflicto  
            } catch (error) {  
                throw new Error(`Error al verificar disponibilidad: ${error.message}`);  
            }  
        }  
    
        // Modificar el método createConference  
        static async createConference(data) {  
            try {  
                const { Name, Place, Date, StartHour, EndHour, CreatedBy } = data;  
    
                // Verificar disponibilidad  
                const isAvailable = await this.checkAvailability(Place, Date, StartHour, EndHour);  
    
                if (!isAvailable) {  
                    throw new Error('La sala ya está reservada para el horario seleccionado');  
                }  
    
                const conference = new Conference({  
                    Name,  
                    Place,  
                    Date,  
                    StartHour,  
                    EndHour,  
                    CreatedBy,  
                });  
    
                return await conference.save();  
            } catch (error) {  
                throw new Error(error.message);  
            }  
        }  
    
    static async updateConference(id, data, userId, isAdmin) {  
        try {  
            // Validar el formato de hora  
            if (data.StartHour && !/^([01]\d|2[0-3]):([0-5]\d)$/.test(data.StartHour)) {  
                throw new Error('Invalid start hour format. Use HH:mm');  
            }  
            if (data.EndHour && !/^([01]\d|2[0-3]):([0-5]\d)$/.test(data.EndHour)) {  
                throw new Error('Invalid end hour format. Use HH:mm');  
            }  
    
            // Validar que la fecha sea válida  
            if (data.Date && isNaN(new Date(data.Date).getTime())) {  
                throw new Error('Invalid date format');  
            }  
    
            // Si se proporciona un lugar, verificar que existe  
            if (data.Place) {  
                const place = await Place.findById(data.Place);  
                if (!place) {  
                    throw new Error('Place not found');  
                }  
            }  
    
            // Si es admin, puede actualizar cualquier conferencia  
            if (isAdmin) {  
                return await Conference.findByIdAndUpdate(  
                    id,  
                    data,  
                    { new: true, runValidators: true }  
                ).populate('Place');  
            }  
    
            // Si no es admin, solo puede actualizar sus propias conferencias  
            return await Conference.findOneAndUpdate(  
                { _id: id, CreatedBy: userId },  
                data,  
                { new: true, runValidators: true }  
            ).populate('Place');  
        } catch (error) {  
            console.error('Error detallado:', error);
            if (error.response && error.response.data) {
                alert(`Error del servidor: ${error.response.data.message}`);
            } else {
                alert('Error al actualizar la conferencia. Intenta nuevamente.');
            }
        };
    }  

    // Eliminar una conferencia
static async deleteConference(id, userId, isAdmin) {
    try {
        // Si es administrador, puede eliminar cualquier conferencia
        if (isAdmin) {
            return await Conference.findByIdAndDelete(id).populate('Place');
        }

        // Si no es administrador, solo puede eliminar las conferencias que haya creado
        return await Conference.findOneAndDelete({ _id: id, CreatedBy: userId }).populate('Place');
    } catch (error) {
        throw new Error(error.message);
    }
}



}

module.exports = ConferenceClass;
