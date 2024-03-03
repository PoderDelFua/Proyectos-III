const { usuarioModel } = require('../models')

// Middleware para verificar si un usuario existe por correo
const checkUserExists = async (req, res, next) => {
    const { correo } = req.body
    try {
        console.log('Buscando usuario en la base de datos...')
        const user = await usuarioModel.findOne({ correo: correo })
        if (user) {
            // Si el usuario existe, envía una respuesta y no llames a next()
            console.log('Usuario encontrado:', user)
            return res.status(400).json({ message: 'El usuario ya existe' })
        }
        
        return res.status(200).json({ message: 'El usuario no existe' })
    } catch (error) {
        return res.status(500).json({ message: 'Error al buscar el usuario', error: error })
    }
}

module.exports = checkUserExists
