const {actividadesModel, usuarioModel} = require("../models")
const {handleHttpError} = require("../utils/handleError")
const {matchedData} = require("express-validator")


const getItems = async (req, res) => {
    try {
        const data = await actividadesModel.find({}).populate("usuarios", "nombre").populate("grupo", "nombre")
        res.send({data})
    } catch (err) {
        handleHttpError(res, "ERROR_GET_ACTIVIDADES")
    }
}

const getItem = async (req, res) => {
    
    try {
        const {id} = matchedData(req)
        const data = await actividadesModel.findById(id).populate("usuarios", "nombre").populate("grupo", "nombre")
        if (!data) {
            handleHttpError(res, "ACTIVIDAD_NOT_EXISTS", 404)
        }
        res.send({data})
    } catch (err) {
        handleHttpError(res, "ERROR_GET_ACTIVIDAD")
    }
}

const addUser = async (req, res) => {
    try {
        const { pageId, userId } = matchedData(req);
        const validacion = await actividadesModel.findOne({ _id: pageId, usuarios: userId });
        if(validacion !== null){
            return res.send({ message: "El usuario YA está en la actividad" });
        }
        const data = await actividadesModel.findByIdAndUpdate(pageId, {$push: {usuarios: userId}}, {new: true})
        res.send({data})
    }catch (error) {
        console.error("Error al añadir id usuario a la actividad: ", error);
        handleHttpError(res, "ERROR_UPDATE_ACTIVIDAD")
    }
}

const removeUser = async (req, res) => {
    try {
        const { pageId, userId } = matchedData(req);
        const data = await actividadesModel.findByIdAndUpdate(pageId, { $pull: { usuarios: userId } }, { new: true });
        res.send({ data });
    } catch (error) {
        console.error("Error al eliminar id usuario de actividad: ", error);
        handleHttpError(res, "ERROR_UPDATE_ACTIVIDAD");
    }
}

const updateItem = async (req, res) => {
    try {
        const { pageId, ...body } = matchedData(req);
        const data = await actividadesModel.findByIdAndUpdate(pageId, body, { new: true });
        res.send({ data });
    } catch (error) {   
        console.error("Error al actualizar la actividad: ", error);
        handleHttpError(res, "ERROR_UPDATE_ACTIVIDAD");
    }
}

const deleteItem = async (req, res) => {
    const {id} = req.params
    try {
        const data = await actividadesModel.findByIdAndDelete(id)
        if (!data) {
            handleHttpError(res, "ACTIVIDAD_NOT_EXISTS", 404)
        }
        res.send({data})
    } catch (error) {
        handleHttpError(res, "ERROR_DELETE_ACTIVIDAD")
    }
}
const createItem = async (req, res) => {
    try {
        console.log("Creando actividad...")
        const body = matchedData(req)
        console.log(body)
        const data = await actividadesModel.create(body)
        console.log("Actividad creada")
        res.send({data})
    } catch (error) {
        console.error("Error al crear la actividad: ", error);
        handleHttpError(res, "ERROR_CREATE_ACTIVIDAD")
    }
}
const getItemsByUser = async (req, res) => {
    try {
        const {id} = req.params
        const data = await actividadesModel.find({creadoPor: id})
        res.send({data})
    } catch (err) {
        handleHttpError(res, "ERROR_GET_ACTIVIDADES")
    }
}
const getActividadesApuntado = async (req, res) => {
    const arrayIdActividades = req.user.actividades;
    try {
        const data = await actividadesModel.find({ _id: { $in: arrayIdActividades } });
        res.send({ data });
    } catch (error) {
        handleHttpError(res, "ERROR_GET_ACTIVIDADES_APUNTADO");
    }
}
const getActividadesFav = async (req, res) => {
    const arrayIdActividades = req.user.favoritos;
    try {
        const data = await actividadesModel.find({ _id: { $in: arrayIdActividades } });
        res.send({ data });
    } catch (error) {
        handleHttpError(res, "ERROR_GET_ACTIVIDADES_FAV");
    }
}
module.exports = {
    getItems,
    getItem,
    addUser,
    removeUser,
    updateItem,
    createItem,
    deleteItem,
    getItemsByUser,
    getActividadesApuntado,
    getActividadesFav
}
