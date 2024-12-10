const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Definir el esquema de usuario
const UserSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
        trim: true
    },
    LastName: {
        type: String,
        required: true,
        trim: true
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Por favor, ingresa un correo válido.']
    },
    Password: {
        type: String,
        required: true,
        minlength: 6
    },
    IsAdmin:{
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Middleware para hashear la contraseña antes de guardar
UserSchema.pre('save', async function (next) {
    const user = this;

    // Solo hashear la contraseña si fue modificada o es nueva
    if (!user.isModified('Password')) return next();

    try {
        const salt = await bcrypt.genSalt(10); // Generar el salt
        user.Password = await bcrypt.hash(user.Password, salt); // Hashear la contraseña
        next();
    } catch (error) {
        next(error);
    }
});

// Método para comparar contraseñas (útil para login)
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.Password);
};

module.exports = mongoose.model('User', UserSchema);