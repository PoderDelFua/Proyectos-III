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
    check("timestamp").exists().notEmpty().isISO8601().withMessage("The value must be in ISO 8601 format. timestamp: 2024-03-31T12:00:00Z"),
    check("grupo").exists().notEmpty().isString().withMessage("The value must be a string"),
    check("padreMensaje").optional().isMongoId().withMessage("The value must be a valid MongoId"),

    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorUpdateItem = [
    check("autorMensaje").optional().isMongoId(),
    check("mensaje").optional().isString(),
    check("timestamp").optional().isDate(),
    check("grupo").optional().isString(),
    check("padreMensaje").optional().isMongoId(),

    (req, res, next) => {
        return validateResults(req, res, next)
    }
]





module.exports = { validatorGetItem, validatorCreateItem, validatorUpdateItem}