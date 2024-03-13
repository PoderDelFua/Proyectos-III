const mongoose = require('mongoose')


const diaSemana = new mongoose.Schema({
    fecha: {
        type: Date,
        required: true
    },
    horario: {
        type: [Number],
        required: true
    }

}, { _id: false })     

const horarios = new mongoose.Schema({
    lunes: { type: diaSemana, required: true},
    martes: { type: diaSemana, required: true},
    miercoles: { type: diaSemana, required: true},
    jueves: { type: diaSemana, required: true},
    viernes: { type: diaSemana, required: true}
    
},
{ 
    timestamps: true,
    versionKey: false
}) 

module.exports = mongoose.model('Horarios', horarios, 'horarios')
