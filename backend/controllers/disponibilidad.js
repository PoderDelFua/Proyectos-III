const Disponibilidad = require('../models/nosql/disponibilidad')

// Función para crear disponibilidad
exports.createDisponibilidad = async (req, res) => {
    try {
        const nuevaDisponibilidad = new Disponibilidad(req.body)
        const disponibilidadGuardada = await nuevaDisponibilidad.save()
        res.status(201).json(disponibilidadGuardada)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Función para obtener todas las disponibilidades
exports.getDisponibilidades = async (req, res) => {
    try {
        // Busca todas las disponibilidades en la base de datos
        const disponibilidades = await Disponibilidad.find({})
        // Devuelve las disponibilidades encontradas con un estado 200 OK
        res.status(200).json(disponibilidades)
    } catch (error) {
        // En caso de error, devuelve un estado 500 con el mensaje de error
        res.status(500).json({ message: error.message })
    }
}
