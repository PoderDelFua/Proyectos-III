const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorRegister = [
    check("correo").isEmail().withMessage("El correo debe ser un email de la utad."),
    check("correo").custom((value) => {
        if (value.endsWith("@live.u-tad.com") || value.endsWith("@u-tad.com")){
            return true
        } else {
            throw new Error("El correo debe ser de la utad")
        }
    }),
    check("nombre").isString().exists().notEmpty().withMessage("El nombre es obligatorio."),
    check("password").isString().exists().notEmpty().isLength( {min:6, max: 16} ).withMessage("La contraseña debe tener entre 6 y 16 caracteres."),
    check("nickname").isString().exists().notEmpty().withMessage("El nickname es obligatorio."),
    check("instrumento").isArray().exists().notEmpty().withMessage("El instrumento es obligatorio."),
    check("gusto_musical").isString().exists().notEmpty().withMessage("El gusto musical es obligatorio."),
    check("bio").isString().exists().notEmpty().withMessage("La bio es obligatoria."),
    (req, res, next) => {
        validateResults(req, res, next)
    }
]


const validatorLogin = [
    check("correo").exists().notEmpty().isString().withMessage("El correo no es válido."),
    check("password").exists().notEmpty().isLength( {min:6, max: 16} ).withMessage("La contraseña no es válida."),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]   
const validatorActivity = [
    check("nombre").isString().exists().notEmpty().withMessage("El nombre es obligatorio."),
    check("descripcion").isString().exists().notEmpty().withMessage("La descripcion es obligatoria."),
    check("lugar").isString().exists().notEmpty().withMessage("El lugar es obligatorio."),
    check("fecha").isString().exists().notEmpty().withMessage("La fecha es obligatoria."),
    check("instrumento").isArray().exists().notEmpty().withMessage("El instrumento es obligatorio."),
    check("gusto_musical").isString().exists().notEmpty().withMessage("El gusto musical es obligatorio."),
    check("nivel").isArray().exists().notEmpty().withMessage("El nivel es obligatorio."),
    (req, res, next) => {
        validateResults(req, res, next)
    }
]

const validatorUpdateUser = [
    check("id").isString().exists().notEmpty().withMessage("El id es obligatorio."),
    check("nombre").isString().optional(),
    check("nickname").isString().optional(),
    check("instrumento").isArray().optional(),
    check("gusto_musical").isString().optional(),
    check("nivel").isArray().optional(),
    check("bio").isString().optional(),
    (req, res, next) => {
        validateResults(req, res, next)
    }
]

module.exports = { validatorRegister, validatorLogin, validatorActivity, validatorUpdateUser }