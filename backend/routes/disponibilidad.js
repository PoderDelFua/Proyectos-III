const express = require('express')
const router = express.Router()
const disponibilidadController = require('../controllers/disponibilidad')
router.post('/', disponibilidadController.createDisponibilidad)
router.get('/', disponibilidadController.getDisponibilidades)
module.exports = router
