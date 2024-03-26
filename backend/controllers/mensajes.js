
const { mensajesModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');
const { matchedData } = require('express-validator');

const getItems = async (req, res) => {
    try{
        const data = await HorarioModel.find({})
        res.send(data)
    }catch(err){
        handleHttpError(res, 'ERROR_GET_ITEMS_MENSAJES', 403)
    }
}

const getItem = async (req, res) => {
}

const createItem = async (req, res) => {
    try {
        const body = matchedData(req) //El dato filtrado por el modelo (probar con body=req)
        const data = await HorarioModel.create(body)
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