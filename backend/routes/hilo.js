const express = require('express');
const router = express.Router();
const hilo = require('../controllers/hilo');

router.post('/crear', hilo.crearHilo);

module.exports = router;
