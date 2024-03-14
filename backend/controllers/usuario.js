const { usuarioModel } = require("../models")
const usuario = require("../models/nosql/usuario")
const { handleHttpError } = require("../utils/handleError")
const { matchedData } = require("express-validator")

const getItems = async (req, res) => {
    try{
        const data = await usuarioModel.find({})
    res.send({data})
    }catch(err){
        handleHttpError(res, "ERROR_GET_USERS")
    }
}

const getItem = async (req, res) => {
    datosUser = req.user
    try {
        const data = await usuarioModel.findById(datosUser._id)
        res.send({data})        
    } catch (err) {
        handleHttpError(res, "ERROR_GET_USER")
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
    try{
        var datosUser = req.user
        datosUser = matchedData(req)
        const data = await usuarioModel.findByIdAndUpdate(req.user._id, datosUser, {new: true})
        //Tenemos que enviar el objeto actualizado, por eso usamos {new:true}
        //El body debe contener los campos a actualizar, no es necesario enviar todos los campos
        res.send({data})
     }catch(err){
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
                   checkUserExists,
                   updateItem, 
                   deleteItem }
   