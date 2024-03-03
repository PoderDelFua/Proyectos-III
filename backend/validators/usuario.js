const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorCreateItem = [
    check("correo").isEmail().withMessage("El correo debe ser un email."),
    check("correo").custom((value) => {
        if (value.endsWith("@live.u-tad.com") || value.endsWith("@u-tad.com")){
            return true
        } else {
            throw new Error("El correo debe ser de la utad")
        }
    }),
    check("nombre").isString().exists().notEmpty().withMessage("El nombre es obligatorio."),
    check("password").isString().exists().notEmpty().withMessage("La contraseña es obligatoria."),
    check("nickname").isString().exists().notEmpty().withMessage("El nickname es obligatorio."),
    (req, res, next) => validateResults(req, res, next)
]
const validatorGetItem = [
    check("correo").exists().notEmpty().isString().withMessage("El correo no es válido."),
    (req, res, next) => {
        return validateResults(req, res, next)
    } 
]
const validatorGetItemWithID = [
    check("id").exists().notEmpty().isString().withMessage("El id no es válido."),
    (req, res, next) => {
        return validateResults(req, res, next)
    } 
]
module.exports = { validatorCreateItem, validatorGetItem, validatorGetItemWithID }