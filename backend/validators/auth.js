const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorRegister = [
    check("correo").isEmail().withMessage("El correo debe tener en formato de un correo electrónico."),
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
    check("gusto_musical").isArray().exists().notEmpty().withMessage("El gusto musical es obligatorio."),
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

const validatorUpdateUser = [
    check("id").isMongoId().exists().notEmpty().withMessage("El id es obligatorio."),
    check("nombre").isString().optional(),
    check("correo").isEmail().optional(),
    check("nickname").isString().optional(),
    check("instrumento").isArray().optional(),
    check("gusto_musical").isArray().optional(),
    check("bio").isString().optional(),
    check("horarios").isMongoId().optional(),
    check("grupos").isArray().optional(),
    check("actividades").isArray().optional(),
    (req, res, next) => {
        validateResults(req, res, next)
    }
]
const validatorActivity = [
    check("nombre").isString().exists().notEmpty().withMessage("El nombre es obligatorio."),
    check("descripcion").isString().exists().notEmpty().withMessage("La descripcion es obligatoria."),
    check("instrumento").isArray().exists().notEmpty().withMessage("El instrumento es obligatorio."),
    check("horarios").isString().exists().notEmpty().withMessage("El horario es obligatorio."),
    check("grupo").isMongoId().optional(),
    check("lugar").isString().optional(),
    check("usuarios").isArray().optional(),
    check("creadoPor").isMongoId().optional(),
    (req, res, next) => {
        validateResults(req, res, next)
    }
]

const validatorUpdateActivity = [
    check("pageId").isMongoId().exists().notEmpty().withMessage("El id de la actividad es obligatorio."),
    check("userId").isMongoId().exists().notEmpty().withMessage("El id del usuario es obligatorio."),
    (req, res, next) => {
        validateResults(req, res, next)
    }
]
const validatorUpdateUserActivity = [
    check("userId").isMongoId().exists().notEmpty().withMessage("El id del usuario es obligatorio."),
    check("pageId").isMongoId().exists().notEmpty().withMessage("El id de la actividad es obligatorio."),
    (req, res, next) => {
        validateResults(req, res, next)
    }
]
const validatorIdFormat = [
    check("id").exists().notEmpty().isMongoId(), 
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]
module.exports = { validatorRegister, validatorLogin, validatorActivity, validatorUpdateUser, validatorUpdateActivity , validatorUpdateUserActivity, validatorIdFormat}