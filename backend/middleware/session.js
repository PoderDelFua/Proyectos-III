const { handleHttpError } = require("../utils/handleError")
const { verifyToken } = require("../utils/handleJwt")
const { usuarioModel } = require("../models")

const authMiddleware = async (req, res, next) => {
    try{
        if (!req.headers.authorization) {
            handleHttpError(res, "NOT_TOKEN", 401)
            return
        }

        // Nos llega la palabra reservada Bearer (es un estándar) y el Token, así que me quedo con la última parte
        const token = req.headers.authorization.split(' ').pop() 
        //Del token, miramos en Payload (revisar verifyToken de utils/handleJwt)
        const dataToken = await verifyToken(token)
        if(!dataToken || !dataToken._id) {
            handleHttpError(res, "ERROR_ID_TOKEN", 401)
            return
        }
        const user = await usuarioModel.findById(dataToken._id)
        req.user = user // Inyecto al user en la petición
        req.user._id = dataToken._id // Inyecto el id en la petición
        next()

    }catch(err){
        console.log(err)
        handleHttpError(res, "NOT_SESSION", 401)
    }
}
const authMiddlewareRecovery = async (req, res, next) => {
    try{
        if (!req.headers.authorization) {
            handleHttpError(res, "NOT_TOKEN", 401)
            return
        }
        // Nos llega la palabra reservada Bearer (es un estándar) y el Token, así que me quedo con la última parte
        const token = req.headers.authorization.split(' ').pop()
        //Del token, miramos en Payload (revisar verifyToken de utils/handleJwt)
        const dataToken = await verifyToken(token)
        if(!dataToken || !dataToken._id) {
            handleHttpError(res, "ERROR_ID_TOKEN", 401)
            return
        }

        //Buscamos por el correo
        const user = await usuarioModel.findOne({correo: dataToken.email})
        req.user = user // Inyecto al user en la petición
        req.user._id = dataToken._id // Inyecto el id en la petición

        next()

    }catch(err){
        console.log(err)
        handleHttpError(res, "NOT_SESSION", 401)
    }
}

module.exports = {authMiddleware, authMiddlewareRecovery}