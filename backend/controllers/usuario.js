const { usuarioModel } = require("../models")
const { handleHttpError } = require("../utils/handleError")

const getItems = async (req, res) => {
    try{
        const data = await usuarioModel.find({})
    res.send({data})
    }catch(err){
        handleHttpError(res, "ERROR_GET_USERS")
    }
}

const getItem = async (req, res) => {
    const { id } = req.params // Asumiendo que usas el ID del usuario en la ruta como /:id
    try {
        const data = await usuarioModel.findById(id)
        console.log(`Data: ${data}`)
        if (!data) {
            handleHttpError(res, "USER_NOT_EXISTS", 404)
        }
        res.send({data})
    } catch (err) {
        handleHttpError(res, "ERROR_GET_USER")
    }
}

const createItem = async (req, res) => {
    try{
        const { body } = req
        const data = await usuarioModel.create(body)
        res.send({data})
    }catch(err){
        handleHttpError(res, "ERROR_CREATE_USER")
    }
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
    } catch (err) {
        handleHttpError(res, "ERROR_CHECK_USER_EXISTS")
    }
}

const updateItem = async (req, res) => {
    const { id } = req.params 
    const { disponibilidad } = req.body 

    try {
        const data = await usuarioModel.findByIdAndUpdate(
            id,
            { disponibilidad: disponibilidad },
            { new: true } 
        )

        if (!data) {
            handleHttpError(res, "USER_NOT_EXISTS", 404)
        }

        res.send({data})
    } catch (error) {
        handleHttpError(res, "ERROR_UPDATE_USER")
    }
}

const deleteItem = async (req, res) => {
    const { id } = req.params // Asumiendo que usas el ID del usuario en la ruta como /:id
    try {
        const deletedItem = await usuarioModel.findByIdAndDelete(id)
        if (deletedItem) {
            handleHttpError(res, "USER_NOT_EXISTS", 404)
        } else {
            res.send({message: "Usuario eliminado correctamente."})
        }
    } catch (error) {
        handleHttpError(res, "ERROR_DELETE_USER")
    }
}

module.exports = { getItems, 
                   getItem, 
                   createItem, 
                   checkUserExists,
                   updateItem, 
                   deleteItem }
   