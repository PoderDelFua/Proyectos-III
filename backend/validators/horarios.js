const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const mongoose = require('mongoose');

const validatorCreateItem = [
    check("lunes").exists().notEmpty(),
    check("lunes.fecha").exists().notEmpty().isDate(),
    check("lunes.horario").exists().notEmpty().isArray({ min: 12, max: 12 }).withMessage("The array must have 12 elements"),
    check("lunes.horario.*").isInt().isIn([0, 1]).withMessage("The value must be either 0 or 1"),
    
    check("martes").exists().notEmpty(),
    check("martes.fecha").exists().notEmpty().isDate(),
    check("martes.horario").exists().notEmpty().isArray({ min: 12, max: 12 }).withMessage("The array must have 12 elements"),
    check("martes.horario.*").isInt().isIn([0, 1]).withMessage("The value must be either 0 or 1"),
    
    check("miercoles").exists().notEmpty(),
    check("miercoles.fecha").exists().notEmpty().isDate(),
    check("miercoles.horario").exists().notEmpty().isArray({ min: 12, max: 12 }).withMessage("The array must have 12 elements"),
    check("miercoles.horario.*").isInt().isIn([0, 1]).withMessage("The value must be either 0 or 1"),
    
    check("jueves").exists().notEmpty(),
    check("jueves.fecha").exists().notEmpty().isDate(),
    check("jueves.horario").exists().notEmpty().isArray({ min: 12, max: 12 }).withMessage("The array must have 12 elements"),
    check("jueves.horario.*").isInt().isIn([0, 1]).withMessage("The value must be either 0 or 1"),
    
    check("viernes").exists().notEmpty(),
    check("viernes.fecha").exists().notEmpty().isDate(),
    check("viernes.horario").exists().notEmpty().isArray({ min: 12, max: 12 }).withMessage("The array must have 12 elements"),
    check("viernes.horario.*").isInt().isIn([0, 1]).withMessage("The value must be either 0 or 1"),
    
    (req, res, next) => validateResults(req, res, next)
];

const validatorGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
module.exports = { validatorCreateItem, validatorGetItem }



