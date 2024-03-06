const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")
const validatorCreateItem = [
    check("titulo").exists().notEmpty().isLength({ min: 5 }, { max: 50 }),
    check("descripcion").exists().notEmpty(),
    check("horario").exists().notEmpty(),
    check("participantes").exists().notEmpty(),
    check("participantes.numParticipantes").exists().notEmpty().isInt(),
    check("participantes.idParticipantes").exists().notEmpty().isArray(),
    // .custom((value) => { return value.every((element) => element.isMongoId()); }),
    check("lugar").exists().notEmpty(),
    (req, res, next) => validateResults(req, res, next)
];

const validatorGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
module.exports = { validatorCreateItem, validatorGetItem }

const validatorHorario = [
    check("horario").exists().notEmpty().isArray().custom((value) => {
        if (value.length !== 5) {
            throw new Error("horario must have 5 rows");
        }
        for (let i = 0; i < value.length; i++) {
            if (!Array.isArray(value[i]) || value[i].length !== 12) {
                throw new Error("horario must have 12 columns in each row");
            }
            for (let j = 0; j < value[i].length; j++) {
                if (value[i][j] !== 0 && value[i][j] !== 1) {
                    throw new Error("horario must contain only 0 and 1");
                }
            }
        }
        return true;
    }),
    (req, res, next) => validateResults(req, res, next)
]