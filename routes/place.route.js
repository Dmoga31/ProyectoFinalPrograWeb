const express = require('express');
const router = express.Router();
const PlaceController = require('../controllers/place.controller.js');
const verifyAdmin = require('../middleware/verifyAdmin.middleware.js'); // Importa el middleware de verifyAdmin
const verifyToken = require('../middleware/verifyToken.middleware.js'); // Importa el middleware de verifytoken

// Obtener todos los lugares
router.get('/',verifyToken, PlaceController.getAllPlaces);

// Obtener un lugar por ID
router.get('/:id',verifyToken, PlaceController.getPlaceById);

/*router.get('/:name',verifyToken, PlaceController.getPlaceByName);*/


// Crear un nuevo lugar
router.post('/',verifyToken, verifyAdmin, PlaceController.createPlace);

// Actualizar un lugar
router.put('/:id',verifyToken, verifyAdmin, PlaceController.updatePlace);

// Eliminar un lugar
router.delete('/:id',verifyToken, verifyAdmin, PlaceController.deletePlace);

module.exports = router;
