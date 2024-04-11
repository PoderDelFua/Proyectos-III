const { matchedData } = require("express-validator")
const { tokenSign, tokenRecovery, verifyToken } = require("../utils/handleJwt")
const { encrypt, compare } = require("../utils/handlePassword")
const {handleHttpError} = require("../utils/handleError")
const {usuarioModel} = require("../models")
const nodemailer = require("nodemailer");
const {configDotenv} = require("dotenv");
const transporter = require("../config/transporter")
//Accedemos al env para obtener las credenciales
require('dotenv').config()


/**
 * Encargado de registrar un nuevo usuario
 * @param {*} req 
 * @param {*} res 
 */
const registerCtrl = async (req, res) => {
    try {
        req = matchedData(req)
        const password = await encrypt(req.password)
        const body = {...req, password} // Con "..." duplicamos el objeto y le añadimos o sobreescribimos una propiedad
        const dataUser = await usuarioModel.create(body)
        //Si no queremos que se devuelva el hash con "findOne", en el modelo de users ponemos select: false en el campo password
        //Además, en este caso con "create", debemos setear la propiedad tal que:  
        dataUser.set('password', undefined, { strict: false })

        const data = {
            token: await tokenSign(dataUser),
            usuario: dataUser
        }
        res.send(data)  
    }catch(err) {
        console.log(err)
        handleHttpError(res, "ERROR_REGISTER_USER")
    }
}


/**
 * Encargado de hacer login del usuario
 * @param {*} req 
 * @param {*} res 
 */
const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req)
        const usuario = await usuarioModel.findOne({ correo: req.correo }).select("password nombre correo _id")

        if(!usuario){
            handleHttpError(res, "USER_NOT_EXISTS", 404)
            return
        }
        
        const hashPassword = usuario.password;
        const check = await compare(req.password, hashPassword)


        if(!check){
            handleHttpError(res, "INVALID_PASSWORD", 401)
            return
        }
        //Si no quisiera devolver el hash del password
        usuario.set('password', undefined, {strict: false})
        const data = {
            token: await tokenSign(usuario),
            usuario
        }

        res.send(data)

    }catch(err){
        console.log(err)
        handleHttpError(res, "ERROR_LOGIN_USER")
    }
}

const forgotPasswordCtrl = async (req, res) => {
    //Mover trasnporter a config y exportarlo


    try {
        req = matchedData(req)
        const user = await usuarioModel.findOne({ correo: req.correo })
        if (!user) {
            handleHttpError(res, "USER_NOT_EXISTS", 404)
            return
        }
        enlaceToken = await tokenRecovery(user)
        userMail = user.correo
        let mailOptions = {
            from: process.env.EMAIL,
            to: userMail,
            subject: "Recuperación de contraseña",
            html: `<h1>Recuperación de contraseña</h1> + <p>Para recuperar tu contraseña, haz clic en el siguiente enlace: <a href="${process.env.FRONTEND_URI}/recover/${enlaceToken}">Recuperar contraseña</a></p>`
        }
        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email enviado: " + info.response);
            }
        });
        res.send({ message: "Mira el enlace que hemos enviado a tu email para restaurar la contraseña" })
    } catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_FORGOT_PASSWORD")
    }

}
/*
const recoverPassCtrl = async (req, res) => {
    try {
        req = matchedData(req)
        const dataToken = await verifyToken(req.token)
        if (!dataToken || !dataToken._id) {
            handleHttpError(res, "ERROR_ID_TOKEN", 401)
            return
        }
        const userMail = dataToken.correo
        console.log("QUE", userMail)
        const user = await usuarioModel.findOne({ correo: userMail })
        if (!user) {
            handleHttpError(res, "USER_NOT_EXISTS")
            return
        }
        const password = await encrypt(req.password)
        const data = await usuarioModel.findByIdAndUpdate(user._id, { password }, { new: true })
        res.send({ message: "Contraseña actualizada correctamente" })
    } catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_RECOVER_PASSWORD")
    }
}
*/


module.exports = { registerCtrl, loginCtrl, forgotPasswordCtrl}