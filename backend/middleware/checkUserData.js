const { usuarioModel } = require('../models')

// Middleware para verificar si un usuario existe por correo
const checkUserExists = async (req, res) => {
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

const checkLogin = async (req, res) => {
    const { correo, password } = req.body
    try {
        console.log('Buscando usuario en la base de datos...')
        const user = await usuarioModel.findOne({ correo: correo })
        
        if (!user) {
            console.log('Usuario no encontrado con el correo:', correo)
            return res.status(400).json({ exists: false })
        }
        
        if (user.password !== password) {
            console.log('Contraseña incorrecta para el correo:', correo)
            return res.status(400).json({ exists: false })
        }

        console.log('Usuario encontrado:', user)
        return res.status(200).json({ exists: true, userId: user._id })
    } catch (error) {
        console.error('Error en loginCheck:', error)
        res.status(500).send({ message: error.message })
    }
}

module.exports = { checkUserExists, checkLogin }
