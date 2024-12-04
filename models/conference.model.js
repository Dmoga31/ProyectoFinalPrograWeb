const mongoose = require("mongoose");

const ConferenceSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "El nombre de la conferencia es obligatorio"],
      trim: true,
    },
    Place: {
      type: mongoose.Schema.Types.ObjectId, // Referencia a Place
      ref: "Place", // Nombre del modelo al que se hace referencia
      required: [true, "El lugar de la conferencia es obligatorio"],
    },
    Date: {
      type: Date,
      required: [true, "La fecha de la conferencia es obligatoria"],
    },
    CreatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Relación con el modelo User
    StartHour: {
      type: String,
      required: [true, "La hora de inicio es obligatoria"],
      validate: {
        validator: (value) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(value),
        message: "La hora de inicio debe tener el formato HH:mm",
      },
    },
    EndHour: {
      type: String,
      required: [true, "La hora de finalización es obligatoria"],
      validate: {
        validator: (value) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(value),
        message: "La hora de finalización debe tener el formato HH:mm",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conference", ConferenceSchema);
