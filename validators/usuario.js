const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")
const { usuarioModel } = require("../models")

const validatorCreateItem = [
    check("correo").isEmail().withMessage("El correo debe ser un email."),
    check("correo").custom((value) => {
        if (value.endsWith("@live.u-tad.com")) {
            return true
        } else {
            throw new Error("El correo debe ser de live.u-tad.com")
        }
    }),
    check("nombre").isString().exists().notEmpty().withMessage("El nombre es obligatorio."),
    check("password").isString().exists().notEmpty().withMessage("La contraseña es obligatoria."),
    check("nickname").isString().exists().notEmpty().withMessage("El nickname es obligatorio."),
    (req, res, next) => validateResults(req, res, next)
]
const validatorGetItem = [
    check("id").exists().notEmpty().isMongoId().withMessage("El id no es válido."),
    (req, res, next) => {
        return validateResults(req, res, next)
    } 
]
module.exports = { validatorCreateItem, validatorGetItem }