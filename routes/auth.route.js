const express = require('express');
const { loginUser } = require('../controllers/auth.controller');
const router = express.Router();

// Ruta para login
router.post('/login', loginUser);

module.exports = router;
