
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
        .populate('mediaId', 'url filename -_id')

        res.send(data)
    }catch(err){
        handleHttpError(res, 'ERROR_GET_ITEMS_MENSAJES', 403)
    }
}

const getItem = async (req, res) => {
    try{
        const {id} = matchedData(req)
        const data = await mensajesModel.findById(id)
        .populate('autorMensaje', 'nombre -_id')
        .populate({
            path: 'padreMensaje',
            select: 'mensaje-_id',
            populate: {
                path: 'autorMensaje',
                select: 'nombre -_id'
            }
        })
        .populate('mediaId', 'url filename -_id')

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
        
        const populatedData = await mensajesModel.populate(data, [
            { path: 'autorMensaje', select: 'nombre -_id' },
            {
            path: 'padreMensaje',
            select: 'mensaje-_id',
            populate: {
                path: 'autorMensaje',
                select: 'nombre -_id'
            }
            },
            { path: 'mediaId', select: 'url filename -_id' }
        ])


        res.send(populatedData)
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
        const data = await mensajesModel.delete({_id:id})

        res.send(data)    
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_DELETE_ITEM')
    }
}


const getHilo = async (req, res) => {
    try {
        const {grupo} = req.params
        const data = await mensajesModel.find({grupo}).sort({updatedAt: -1})
        .populate('autorMensaje', 'nombre -_id')
        .populate({
            path: 'padreMensaje',
            select: 'mensaje-_id',
            populate: {
                path: 'autorMensaje',
                select: 'nombre -_id'
            }
        })
        .populate('mediaId', 'url filename -_id')
        
        res.send(data)
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_GET_HILO')
    }
}

const getDistinctGrupos = async (req, res) => {
    try {
        const data = await mensajesModel.distinct('grupo')
        res.send(data)
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_GET_DISTINCT_GRUPOS')
    }
}

const getMensajesUserTok = async (req, res) => {
    try {
        const data = await mensajesModel.find({autorMensaje: req.user._id})
        .populate('autorMensaje', 'nombre -_id')
        .populate({
            path: 'padreMensaje',
            select: 'mensaje-_id',
            populate: {
                path: 'autorMensaje',
                select: 'nombre -_id'
            }
        })
        .populate('mediaId', 'url filename -_id')

        res.send(data)
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_GET_ITEMS_MENSAJES', 403)
    }
}


const postMensajeUsuarioTok = async (req, res) => {
    var datosUser = req.user
    var idUser = datosUser._id
    try {
        body = matchedData(req)
        body.autorMensaje = idUser;

        //console.log(body)
        const data = await mensajesModel.create(body);
        const populatedData = await mensajesModel.populate(data, [
            { path: 'autorMensaje', select: 'nombre -_id' },
            {
            path: 'padreMensaje',
            select: 'mensaje-_id',
            populate: {
                path: 'autorMensaje',
                select: 'nombre -_id'
            }
            },
            { path: 'mediaId', select: 'url filename -_id' }
        ]);
        res.send(populatedData);

    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_CREATE_ITEMS')
    }
    
}

 

module.exports = { 
    getItems, 
    getItem,
    createItem, 
    updateItem,
    deleteItem,

    getHilo,
    getDistinctGrupos,
    getMensajesUserTok,
    postMensajeUsuarioTok
}