
const { actividadHorarioModel } = require('../models/')

const { handleHttpError} = require('../utils/handleError')
const { matchedData, body } = require('express-validator')

const getItems = async (req, res) => {
    try{
        const data = await actividadHorarioModel.find({})
        res.send(data)
    }catch(err){
        //Si nos sirve el de por defecto que hemos establecido, no es necesario pasar el 403
        handleHttpError(res, 'ERROR_GET_ITEMS', 403)
    }
}

const getItem = async (req, res) => {
    try{
        const {id} = matchedData(req) //Me quedo solo con el id
        // console.log("ID:", id)
        const data = await actividadHorarioModel.findById(id)
        res.send(data)
    } catch(err){
        //console.log(err)
        handleHttpError(res, "ERROR_GET_ITEM")
    }
}

const createItem = async (req, res) => {
    try {
        const body = matchedData(req) //El dato filtrado por el modelo (probar con body=req)
        const data = await actividadHorarioModel.create(body)
        res.send(data)
    }catch(err){
        handleHttpError(res, 'ERROR_CREATE_ITEMS')
    }
}
const updateItem = async (req, res) => {
    try{
        const {id, ...body} = matchedData(req)
        // console.log("ID:", id)
        // console.log("BODY:", body)
        const data = await actividadHorarioModel.findOneAndUpdate({_id:id}, body, {new:true})
        res.send(data)
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_UPDATE_ITEMS')
    }
}

const deleteItem = async (req, res) => {
    try {
        const {id} = matchedData(req)
        // console.log("ID:", id)
        const data = await actividadHorarioModel.deleteOne({_id:id}); // "deleteOne" realiza el borrado físico en la BD
        // const data = await actividadHorarioModel.delete({_id:id}); // "delete" realiza el borrado lógico
        res.send(data)    
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_DELETE_ITEM')
    }
}

module.exports = { 
    getItems, 
    getItem,
    createItem, 
    updateItem,
    deleteItem }

