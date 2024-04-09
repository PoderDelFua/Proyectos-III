
const { hiloModel, mensajesModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');
const { matchedData } = require('express-validator');

const getItems = async (req, res) => {
    try{
        const data = await hiloModel.find({})
        .populate('creadorId', ' nickname')
        res.send(data)
    }catch(err){
        handleHttpError(res, 'ERROR_GET_ITEMS_HILO', 403)
    }
}

const getItem = async (req, res) => {
    try{
        const {id} = matchedData(req)
        const data = await hiloModel.findById(id)
        .populate('creadorId', 'nombre email nickname')
        if (!data) {
            return res.status(404).send('Hilo not found');
        }
        res.send(data)
    }catch(err){    
        console.log(err)
        handleHttpError(res, 'ERROR_GET_ITEM_HILO')
    }
}

const getMsgHilo = async (req, res) => {
    try{
        const {id} = matchedData(req)
        console.log("ID", id)
        const data = await mensajesModel.find().where('hiloId').equals(id).sort({updatedAt: -1})
        .populate('autorMensaje', 'nombre  ')
        .populate('autorMensaje', ' nickname')
        .populate('hiloId', 'titulo')
        .populate('padreMensaje', 'mensaje')
        if (!data) {
            return res.status(404).send('Hilo not found');
        }
        res.send(data)
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_GET_ITEM_HILO')
    }
}

const createItem = async (req, res) => {
    try {
        const body = matchedData(req)
        const data = await hiloModel.create(body)
        const populatedData = await hiloModel.populate(data, [
            { path: 'creadorId', select: 'nickname' }
        ])
        res.send(populatedData)
    } catch (err) {
        console.log(err)
        handleHttpError(res, 'ERROR_CREATE_ITEM_HILO')
    }
}

const createItemTok = async (req, res) => {

    const idUser = req.user._id
    try {
        const body = matchedData(req)
        body.creadorId = idUser;

        const data = await hiloModel.create(body)
        const populatedData = await hiloModel.populate(data, [
            { path: 'creadorId', select: 'nickname' }
        ])
        res.send(data)
    } catch (err) {
        console.log(err)
        handleHttpError(res, 'ERROR_CREATE_ITEM_HILO')
    }
}

const updateItem = async (req, res) => {

    try {

        const { id, ...body } = matchedData(req);
        const data = await hiloModel.findOneAndUpdate({_id:id}, body, {new:true})
        if (!data) {
            return res.status(404).send('Hilo not found');
        }
        res.send(data)
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_UPDATE_ITEM_HILO')
    }
}


const deleteItem = async (req, res) => {

    try {
        const {id} = matchedData(req)

        const dataHilo = await hiloModel.deleteOne({_id:id})
        if (!dataHilo) {
            return res.status(404).send('Hilo not found');
        }

        const dataMsg = await mensajesModel.deleteMany({hiloId:id})

        const [deletedHilo, deletedMsg] = await Promise.all([dataHilo, dataMsg]);

        res.send({deletedHilo, deletedMsg, dataMsg: `${deletedMsg.deletedCount} mensajes borrados`}) 

    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_DELETE_HILO')
    }
}


module.exports = { 
    getItems, 
    getItem,
    createItem, 
    createItemTok,
    updateItem,
    deleteItem,
    getMsgHilo
}