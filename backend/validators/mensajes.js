const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")


const validatorGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorCreateItem = [
    check("autorMensaje").exists().notEmpty().isMongoId().withMessage("The value must be a valid MongoId"),
    check("mensaje").exists().notEmpty().isString().withMessage("The value must be a string"),
    check("likes").optional().isNumeric().isInt().withMessage("The value must be an integer"),
    check("hiloId").exists().notEmpty().isMongoId().withMessage("The value ( hiloId ) must be a valid MongoId"),
    check("padreMensaje").optional().isMongoId().withMessage("The value must be a valid MongoId"),
    check("mediaId").optional().isMongoId().withMessage("The value ( madiaId ) must be a valid MongoId"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorCreateItemTok = [
    check("mensaje").exists().notEmpty().isString().withMessage("The value must be a string"),
    check("hiloId").exists().notEmpty().isMongoId().withMessage("The value ( hiloId ) must be a valid MongoId"),
    check("padreMensaje").optional().isMongoId().withMessage("The value must be a valid MongoId"),
    check("mediaId").optional().isMongoId().withMessage("The value ( madiaId ) must be a valid MongoId"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]


const validatorUpdateItem = [
    check("autorMensaje").optional().isMongoId(),
    check("mensaje").optional().isString(),
    check("likes").optional().isNumeric().isInt(),
    check("hiloId").optional().isMongoId(),
    check("padreMensaje").optional().isMongoId(),
    check("mediaId").optional().isMongoId(),

    (req, res, next) => {
        return validateResults(req, res, next)
    }
]





module.exports = { validatorGetItem, validatorCreateItem, validatorUpdateItem, validatorCreateItemTok}