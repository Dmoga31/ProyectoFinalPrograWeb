const Conference = require('../models/conference.model');

class ConferenceClass {
    // Obtener todas las conferencias de un usuario
    static async getConferences(userId) {
        try {
            return await Conference.find({ CreatedBy: userId }).populate('Place');
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Obtener una conferencia por ID
    static async getConferenceById(id, userId) {
        try {
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
    static async updateConference(id, data, userId) {
        try {
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
    static async deleteConference(id, userId) {
        try {
            return await Conference.findOneAndDelete({ _id: id, CreatedBy: userId });
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = ConferenceClass;
