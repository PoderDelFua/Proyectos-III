
const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")


const validatorGetItem = [
    check("id").exists().notEmpty().isMongoId(), 
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]

const validatorCreateItem = [
    check("creadorId").exists().notEmpty().isMongoId().withMessage("The value must be a valid MongoId"),
    check("titulo").exists().notEmpty().isString().withMessage("The value must be a string"),
    check("descripcion").exists().notEmpty().isString().withMessage("The value must be a string"),
    check("privado").exists().notEmpty().isBoolean().withMessage("The value must be a boolean"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorCreateItemTok = [
    check("titulo").exists().notEmpty().isString().withMessage("The value must be a string"),
    check("descripcion").exists().notEmpty().isString().withMessage("The value must be a string"),
    check("privado").exists().notEmpty().isBoolean().withMessage("The value must be a boolean"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorUpdateItem = [
    check("creadorId").optional().isMongoId().withMessage("The value must be a valid MongoId"),
    check("titulo").optional().isString().withMessage("The value must be a string"),
    check("descripcion").optional().isString().withMessage("The value must be a string"),
    check("privado").optional().isBoolean().withMessage("The value must be a boolean"),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const test = (req, res, next) => {
    (req, res, next) => {
        return validateResults(req, res, next)
    }
}


module.exports = { validatorCreateItem, validatorCreateItemTok, validatorGetItem, validatorUpdateItem , test}
