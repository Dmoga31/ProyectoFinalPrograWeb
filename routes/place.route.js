const express = require('express');
const router = express.Router();
const PlaceController = require('../controllers/place.controller.js');

// Obtener todos los lugares
router.get('/', PlaceController.getAllPlaces);

// Obtener un lugar por ID
router.get('/:id', PlaceController.getPlaceById);

router.get('/:name', PlaceController.getPlaceByName);

// Crear un nuevo lugar
router.post('/', PlaceController.createPlace);

// Actualizar un lugar
router.put('/:id', PlaceController.updatePlace);

// Eliminar un lugar
router.delete('/:id', PlaceController.deletePlace);

module.exports = router;
