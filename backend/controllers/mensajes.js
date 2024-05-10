
const { mensajesModel, usuarioModel, hiloModel } = require('../models');
const hilo = require('../models/nosql/hilo');
const { handleHttpError } = require('../utils/handleError');
const { matchedData } = require('express-validator');



const getItems = async (req, res) => {
    try{
        const data = await mensajesModel.find({})
        .populate('autorMensaje', 'nombre  ')
        .populate({
            path: 'padreMensaje',
            select: 'mensaje ',
            populate: {
                path: 'autorMensaje',
                select: 'nombre  '
            }
        })
        .populate('mediaId', 'url filename  ')
        .populate('hiloId' , 'titulo')

        res.send(data)
    }catch(err){
        handleHttpError(res, 'ERROR_GET_ITEMS_MENSAJES', 403)
    }
}

const getItem = async (req, res) => {
    try{
        const {id} = matchedData(req)
        const data = await mensajesModel.findById(id)
        .populate('autorMensaje', 'nombre  ')
        .populate({
            path: 'padreMensaje',
            select: 'mensaje ',
            populate: {
                path: 'autorMensaje',
                select: 'nombre  '
            }
        })
        .populate('mediaId', 'url filename  ')
        .populate('hiloId' , 'titulo')

        if (!data) {
            return res.status(404).send('Mensaje not found');
        }
        res.send(data)
    }catch(err){    
        console.log(err)
        handleHttpError(res, 'ERROR_GET_ITEM_MENSAJES')
    }
}


const getHilo = async (req, res) => {
    try {
        const {id} = matchedData(req)
        const hiloId = id
        const data = await mensajesModel.find({hiloId}).sort({updatedAt: -1})
        .populate('autorMensaje', 'nombre  ')
        .populate({
            path: 'padreMensaje',
            select: 'mensaje ',
            populate: {
                path: 'autorMensaje',
                select: 'nombre  '
            }
        })
        .populate('mediaId', 'url filename  ')
        .populate('hiloId' , 'titulo')
        
        res.send(data)
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_GET_HILO')
    }
}

const getMensajesUserTok = async (req, res) => {
    try {
        const userId = req.user._id
        const data = await mensajesModel.find({}).sort({updatedAt: -1})
        .populate('autorMensaje', 'nombre  ')
        .populate({
            path: 'padreMensaje',
            select: 'mensaje ',
            populate: {
                path: 'autorMensaje',
                select: 'nombre  '
            }
        })
        .populate('mediaId', 'url filename  ')
        .populate('hiloId' , 'titulo')

        res.send(data)
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_GET_ITEMS_MENSAJES', 403)
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

const createItem = async (req, res) => {
    console.log("Create Item")
    try {
        body = matchedData(req)
        //console.log(body)
        const data = await mensajesModel.create(body)
        const hiloId = data.hiloId
        // console.log("DATA: ", data)
        // console.log("HiloId: ", hiloId)
        const populatedData = await mensajesModel.populate(data, [
            { path: 'autorMensaje', select: 'nombre  ' },
            {
            path: 'padreMensaje',
            select: 'mensaje ',
            populate: {
                path: 'autorMensaje',
                select: 'nombre  '
            }
            },
            { path: 'mediaId', select: 'url filename  ' },
        ])
        
        await hiloModel.updateOne({ _id:hiloId }, { $inc: { postCount: 1 } })
        // const dataHilo = await hiloModel.findById(hiloId)
        // console.log("DATA HILO: ", dataHilo)

        res.send(populatedData)
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_CREATE_ITEMS')
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
            { path: 'autorMensaje', select: 'nombre  ' },
            {
            path: 'padreMensaje',
            select: 'mensaje ',
            populate: {
                path: 'autorMensaje',
                select: 'nombre  '
            }
            },
            { path: 'mediaId', select: 'url filename  ' },
            { path: 'hiloId', select: 'titulo' }
        ]);
        res.send(populatedData);

    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_CREATE_ITEMS')
    }
    
}

const deleteHilo = async (req, res) => {
    try {
        const {grupo} = req.params
        const data = await mensajesModel.deleteMany({grupo})
        res.send(data)
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_DELETE_HILO')
    }
}

const likeMsg = async (req, res) => {
    const datosUserReq = req.user
    const idUser = datosUserReq._id
   
    try {
        const {id} = matchedData(req)
        const datosUser = await usuarioModel.findById(idUser)

        if (datosUser.likes.includes(id)) {
            return res.send('Mensaje already liked by user');

        }else{
            datosUser.likes.push(id)
            await datosUser.save()
            console.log("Array likes add: ", datosUser.likes)
            
            const data = await mensajesModel.findOneAndUpdate({_id:id}, {$inc: {likes: 1}}, {new:true})
            res.send(data)
        }
        
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_LIKE_MSG')
    }
}


const removeLikeMsg = async (req, res) => {
    const datosUserReq = req.user
    const idUser = datosUserReq._id

    try {
        const {id} = matchedData(req)
        const datosUser = await usuarioModel.findById(idUser)

        if (!datosUser.likes.includes(id)) {
            return res.send('Mensaje is not liked by user');

        }else{
            datosUser.likes.pull(id)
            await datosUser.save()
            console.log("Array likes removed: ", datosUser.likes)
            
            const data = await mensajesModel.findOneAndUpdate({_id:id}, {$inc: {likes: -1}}, {new:true})
            res.send(data)
        }
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_LIKE_MSG')
    }
}


const getRespuestasById = async (req, res) => {

    try{
        const {id} = matchedData(req)
        const data = await mensajesModel.find({padreMensaje: id})
        .populate('autorMensaje', 'nombre')
        .populate( 'mediaId', 'url filename')
        .sort({likes: -1})

        res.send(data)  
    }catch{
        console.log(err)
        handleHttpError(res, 'ERROR_GET_RESPUESTAS_MENSAJE')
    }

}
 

module.exports = { 
    getItems, 
    getItem,
    createItem, 
    updateItem,
    deleteItem,

    likeMsg,
    removeLikeMsg,

    getHilo,
    getDistinctGrupos,
    getMensajesUserTok,
    postMensajeUsuarioTok,
    deleteHilo,

    getRespuestasById
}