const { usuarioModel } = require("../models")

const getItems = async (req, res) => {
    const data = await usuarioModel.find({})
    res.send({data})
}

const getItem = async (req, res) => {
    const { id } = req.params // Asumiendo que usas el ID del usuario en la ruta como /:id
    try {
        const data = await usuarioModel.findById(id)
        if (!data) {
            return res.status(404).send({ message: `No se encontró el usuario con el ID ${id}.` })
        }
        res.send({data})
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const createItem = async (req, res) => {
    const { body } = req
    const data = await usuarioModel.create(body)
    console.log(data)
    res.send({data})
}

const checkUserExists = async (req, res) => {
    const { correo } = req.body
    try {
        const user = await usuarioModel.findOne({ correo: correo })
        if (user) {
            res.json({ exists: true })
        } else {
            res.json({ exists: false })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const loginCheck = async (req, res) => {
    const { correo, password } = req.body
    try {
        console.log('Buscando usuario en la base de datos...');
        const user = await usuarioModel.findOne({ correo: correo });
        
        if (!user) {
            console.log('Usuario no encontrado con el correo:', correo);
            return res.json({ exists: false });
        }
        
        if (user.password !== password) {
            console.log('Contraseña incorrecta para el correo:', correo);
            return res.json({ exists: false });
        }

        console.log('Usuario encontrado:', user);
        res.json({ exists: true, userId: user._id });
    } catch (error) {
        console.error('Error en loginCheck:', error);
        res.status(500).send({ message: error.message });
    }
};

const updateItem = async (req, res) => {
    const { id } = req.params 
    const { disponibilidad } = req.body 

    try {
        const data = await usuarioModel.findByIdAndUpdate(
            id,
            { disponibilidad: disponibilidad },
            { new: true } 
        );

        if (!data) {
            return res.status(404).send({ message: `No se encontró el usuario con el ID ${id}.` })
        }

        res.send({data})
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const deleteItem = async (req, res) => {
    const { id } = req.params // Asumiendo que usas el ID del usuario en la ruta como /:id
    try {
        const deletedItem = await usuarioModel.findByIdAndDelete(id)
        if (deletedItem) {
            res.send({ message: `Usuario con el ID ${id} ha sido eliminado.` })
        } else {
            res.send({ message: `No se encontró el usuario con el ID ${id}.` })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

module.exports = { getItems, 
                   getItem, 
                   createItem, 
                   checkUserExists, 
                   loginCheck, 
                   updateItem, 
                   deleteItem }
   