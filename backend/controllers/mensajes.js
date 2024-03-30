
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
}

const createItem = async (req, res) => {
    try {
        
        const data = await (await mensajesModel.create(req.body))
        //.populate('autorMensaje', 'nombre')
        .populate('padreMensaje', 'mensaje')
        res.send(data)
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_CREATE_ITEMS')
    }
}

const updateItem = async (req, res) => {
}

const deleteItem = async (req, res) => {
}

module.exports = { 
    getItems, 
    getItem,
    createItem, 
    updateItem,
    deleteItem 
}