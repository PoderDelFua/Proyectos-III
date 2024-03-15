const {actividadesModel, usuarioModel} = require("../models")
const {handleHttpError} = require("../utils/handleError")
const {matchedData} = require("express-validator")


const getItems = async (req, res) => {
    try {
        const data = await actividadesModel.find({})
        res.send({data})
    } catch (err) {
        handleHttpError(res, "ERROR_GET_ACTIVIDADES")
    }
}

const getItem = async (req, res) => {
    const {id} = req.params
    try {
        const data = await actividades
        if (!data) {
            handleHttpError(res, "ACTIVIDAD_NOT_EXISTS", 404)
        }
        res.send({data})
    } catch (err) {
        handleHttpError(res, "ERROR_GET_ACTIVIDAD")
    }
}

const updateItem = async (req, res) => {
    try {
        req = matchedData(req)
        const data = await actividadesModel.findByIdAndUpdate(req.pageId, {$push: {usuarios: req.userId}}, {new: true})
        res.send({data})
    }catch (error) {
        handleHttpError(res, "ERROR_UPDATE_ACTIVIDAD")
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
        req = matchedData(req)
        const data = await actividadesModel.create(req)
        res.send({data})
    } catch (error) {
        handleHttpError(res, "ERROR_CREATE_ACTIVIDAD")
    }
}

module.exports = {
    getItems,
    getItem,
    updateItem,
    createItem,
    deleteItem
}
