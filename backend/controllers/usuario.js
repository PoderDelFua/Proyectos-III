const {usuarioModel, actividadesModel} = require("../models")
const usuario = require("../models/nosql/usuario")
const {handleHttpError} = require("../utils/handleError")
const {matchedData} = require("express-validator")
const {encrypt} = require("../utils/handlePassword");

const getItems = async (req, res) => {
    try {
        const data = await usuarioModel.findAllData()
        res.send({data})
    } catch (err) {
        handleHttpError(res, "ERROR_GET_USERS")
    }
}

const getItem = async (req, res) => {
    var datosUser = req.user
    try {
        const data = await usuarioModel.findById(datosUser._id)

        //console.log(data)
        res.send({data})
    } catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_GET_USER")
    }
}

const getItemById = async (req, res) => {
    var id = req.params.id
    try {
        const data = await usuarioModel.findById(id)

        //console.log(data)
        res.send({data})
    } catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_GET_USER")
    }
}

const checkUserExists = async (req, res) => {
    const {correo} = req.body
    try {
        const user = await usuarioModel.findOne({correo: correo})
        if (user) {
            res.json({exists: true})
        } else {
            res.json({exists: false})
        }
    } catch (err) {
        handleHttpError(res, "ERROR_CHECK_USER_EXISTS")
    }
}

const updateItem = async (req, res) => {
    try {
        var datosUser = req.user
        datosUser = matchedData(req)
        const data = await usuarioModel.findByIdAndUpdate(req.user._id, datosUser, {new: true})
        //Tenemos que enviar el objeto actualizado, por eso usamos {new:true}
        //El body debe contener los campos a actualizar, no es necesario enviar todos los campos
        res.send({data})
    } catch (err) {
        handleHttpError(res, "ERROR_UPDATE_USER")
    }
}

const deleteItem = async (req, res) => {
    const {id} = req.params // Asumiendo que usas el ID del usuario en la ruta como /:id
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
const updateActivityData = async (req, res) => {
    try {
        req = matchedData(req);
        const data = await usuarioModel.findByIdAndUpdate(req.userId, {$push: {actividades: req.pageId}}, {new: true});
        res.send({data});
    } catch (error) {
        handleHttpError(res, "ERROR_UPDATE_USER_ACTIVIDAD");
    }
}

const changePassword = async (req, res) => {
    try {
        var datosUser = req.user
        datosUser = matchedData(req)
        const data = await usuarioModel.findByIdAndUpdate(req.user._id, datosUser, {new: true})
        res.send({data})
    } catch (err) {
        handleHttpError(res, "ERROR_UPDATE_USER")
    }
}

const resetPassword = async (req, res) => {
    try {
        var datosUser = matchedData(req)
        const user = await usuarioModel.findById(req.user._id)
        if (!user) {
            handleHttpError(res, "USER_NOT_EXISTS", 404)
            return
        }
        const password = await encrypt(datosUser.password)
        const data = await usuarioModel.findByIdAndUpdate(user._id, {password}, {new: true})
        res.send({message: "Contraseña actualizada correctamente"})
    } catch (err) {
        handleHttpError(res, "ERROR_RESET_PASSWORD")
    }

}


const getActivities = async (req, res) => {
    try {
        const idUser = req.user._id
        const data = await usuarioModel.findById(idUser).populate("actividades")
        const actividades = data.actividades;
        res.send({actividades})
    } catch (err) {
        handleHttpError(res, "ERROR_GET_ACTIVITIES")
    }
}

const addFavoritos = async (req, res) => {
    try {
        const idUser = req.user._id
        const {id} = matchedData(req)
        const validacion = await usuarioModel.findOne({ _id: idUser, favoritos: id });
        if(validacion !== null){
            return res.send({ message: "El la actividad ya está en favoritos" });
        }
        const data = await usuarioModel.findByIdAndUpdate(idUser, {$push: {favoritos: id}}, {new: true})
        res.send({data})
    } catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_ADD_FAVORITOS")
    }
}

const removeFavoritos = async (req, res) => {
    try {
        const idUser = req.user._id
        const {id} = matchedData(req)
        const data = await usuarioModel.findByIdAndUpdate(idUser, {$pull: {favoritos: id}}, {new: true})
        res.send({data})
    }catch (err) {
        handleHttpError(res, "ERROR_REMOVE_FAVORITOS")
    }
}

const getFavoritos = async (req, res) => {
    try {
        const idUser = req.user._id
        const data = await usuarioModel.findById(idUser).populate("favoritos")
        const favoritos = data.favoritos
        res.send({favoritos})
    } catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_GET_FAVORITOS")
    }
}

module.exports = {
    getItems, 
    getItem, 
    checkUserExists, 
    updateItem, 
    deleteItem, 
    updateActivityData, 
    
    changePassword, 
    resetPassword, 
    getItemById,

    getActivities,
    getFavoritos,
    addFavoritos,
    removeFavoritos

}
   