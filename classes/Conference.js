const Conference = require('../models/conference.model');

class ConferenceClass {
    // Obtener todas las conferencias de un usuario
    static async getConferences(userId, isAdmin) {
        try {
            if (isAdmin) {
                return await Conference.find({}).populate('Place');
            } 
            return await Conference.find({ CreatedBy: userId }).populate('Place'); 

        } catch (error) {
            throw new Error(error.message);
        }
    }

// Obtener una conferencia por ID
static async getConferenceById(id, userId, isAdmin) {
    try {
        // Si es administrador, puede acceder a cualquier conferencia
        if (isAdmin) {
            return await Conference.findById(id).populate('Place');
        }

        // Si no es administrador, solo puede acceder a conferencias creadas por él mismo
        return await Conference.findOne({ _id: id, CreatedBy: userId }).populate('Place');
    } catch (error) {
        throw new Error(error.message);
    }
}

    // Crear una nueva conferencia
    static async createConference(data) {
        try {
            const { Name, Place, Date, StartHour, EndHour, CreatedBy } = data;

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
            console.log(data);
            console.log(error.message);
        }
    }
    // Actualizar una conferencia
    static async updateConference(id, data, userId, isAdmin) {
        try {
            // Si es administrador, puede actualizar cualquier conferencia
            if (isAdmin) {
                return await Conference.findByIdAndUpdate(id, data, {
                    new: true,
                    runValidators: true,
                }).populate('Place');
            }

            return await Conference.findOneAndUpdate(
                { _id: id, CreatedBy: userId },
                data,
                { new: true, runValidators: true }
            ).populate('Place');
        } catch (error) {
            throw new Error(error.message);
        }
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
