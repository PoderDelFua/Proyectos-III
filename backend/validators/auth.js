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
    check("role").optional().isString().isIn(["user", "admin"]).withMessage("El rol no es válido.Roles: [\"user\", \"admin\"]"),
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
    check("role").optional().isString().isIn(["user", "admin"]).withMessage("El rol no es válido.Roles: [\"user\", \"admin\"]"),
    check("favoritos").isArray().optional(),
    check("favoritos.*").isMongoId().optional(),
    check("likes").isArray().optional(),
    check("likes.*").isMongoId().optional(),
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
    check("pageId").isMongoId().exists().notEmpty().withMessage("El pageId (id de actividad) es obligatorio."),
    check("nombre").optional().isString().exists().notEmpty().withMessage("El nombre es obligatorio."),
    check("descripcion").optional().isString().exists().notEmpty().withMessage("La descripcion es obligatoria."),
    check("instrumento").optional().isArray().exists().notEmpty().withMessage("El instrumento es obligatorio."),
    check("horarios").optional().isString().exists().notEmpty().withMessage("El horario es obligatorio."),
    check("grupo").isMongoId().optional(),
    check("lugar").isString().optional(),
    check("usuarios").isArray().optional(),
    check("creadoPor").isMongoId().optional(),
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
const validatorChangePassword = [
    check("password").isString().exists().notEmpty().isLength( {min:6, max: 16} ).withMessage("La contraseña debe tener entre 6 y 16 caracteres."),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]

const validatorForgotPassword = [
    check("correo").exists().notEmpty().withMessage("El correo debe tener en formato de un correo electrónico."),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]

module.exports = { validatorRegister, validatorLogin, validatorActivity, validatorUpdateUser, validatorUpdateActivity , validatorUpdateUserActivity, validatorIdFormat, validatorForgotPassword, validatorChangePassword}