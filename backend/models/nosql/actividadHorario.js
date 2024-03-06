// Diapositiva 8
const mongoose = require('mongoose')

const actividadHorarioSchema = new mongoose.Schema(
    {
        titulo:{
            type: String,
            required: true
        },
        descripcion:{
            type: String,
            required: true
        },
        horario:{
            type: [[Number]],
            required: true
        },
        participantes:{
            numParticipantes:{
                type: Number,
                required: true
            },
            idParticipantes:{
                type: [mongoose.Types.ObjectId],
                required: true
            }
        },
        lugar:{
            type: String,
            required: true
        },
    },
    {
        timestamp: true,
        versionKey: false
    }
)

module.exports = mongoose.model('actividadHorario', actividadHorarioSchema)
