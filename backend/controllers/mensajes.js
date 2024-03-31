
const { mensajesModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');
const { matchedData } = require('express-validator');



const getItems = async (req, res) => {
    try{
        const data = await mensajesModel.find({})
        .populate('autorMensaje', 'nombre -_id')
        .populate({
            path: 'padreMensaje',
            select: 'mensaje-_id',
            populate: {
                path: 'autorMensaje',
                select: 'nombre -_id'
            }
        })

        res.send(data)
    }catch(err){
        handleHttpError(res, 'ERROR_GET_ITEMS_MENSAJES', 403)
    }
}

const getItem = async (req, res) => {
    try{
        const {id} = matchedData(req)
        const data = await mensajesModel.findById(id).populate('autorMensaje', 'nombre -_id')
        if (!data) {
            return res.status(404).send('Mensaje not found');
        }
        res.send(data)
    }catch(err){    
        console.log(err)
        handleHttpError(res, 'ERROR_GET_ITEM_MENSAJES')
    }
}

const createItem = async (req, res) => {
    try {
        body = matchedData(req)
        //console.log(body)
        const data = await (await mensajesModel.create(body))
        //.populate('autorMensaje', 'nombre')
        .populate('padreMensaje', 'mensaje')
        res.send(data)
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_CREATE_ITEMS')
    }
}

const updateItem = async (req, res) => {
    try{
        const {id, ...body} = matchedData(req)
        const data = await mensajesModel.findOneAndUpdate({_id:id}, body, {new:true})
        res.send({data})
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_UPDATE_ITEMS')
    }
}

const deleteItem = async (req, res) => {
    try {
        const {id} = matchedData(req)
        //const data = await tracksModel.deleteOne({_id:id}); // "deleteOne" realiza el borrado físico en la BD
        const data = await mensajesModel.delete({_id:id}); // "delete" realiza el borrado lógico
        res.send(data)    
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_DELETE_ITEM')
    }
}


const getHilo = async (req, res) => {
    try {
        const {grupo} = req.params
        const data = await mensajesModel.find({grupo}).sort({updatedAt: -1}).populate('autorMensaje', 'nombre -_id');
        res.send(data)
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_GET_HILO')
    }
}


module.exports = { 
    getItems, 
    getItem,
    createItem, 
    updateItem,
    deleteItem,

    getHilo
}