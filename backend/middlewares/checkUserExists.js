const { usuarioModel } = require('../models/nosql/usuarios'); // Asegúrate de que la ruta al modelo es correcta

// Middleware para verificar si un usuario existe por correo
const checkUserExists = async (req, res, next) => {
    const { correo } = req.body;
    try {
        const user = await usuarioModel.findOne({ correo: correo });
        if (user) {
            // Si el usuario existe, envía una respuesta y no llames a next()
            return res.status(400).json({ message: 'El usuario ya existe' });
        }
        // Si el usuario no existe, pasa al siguiente middleware o controlador
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Error al buscar el usuario', error: error });
    }
};

module.exports = checkUserExists;
