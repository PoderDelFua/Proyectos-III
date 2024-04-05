const mongoose = require('mongoose')

const actividadesSchema = new mongoose.Schema({
    nombre: {
        type: String
    },
    descripcion: {
        type: String
    },
    lugar: {
        type: String
    },
    gusto_musical: [{
        type: String
    }],
    instrumento:[{
        type: String
    }],
    prioridad: {
        type: Boolean
    },
    // añadir publica o privada
    // añadir jefe de la actividad (la persona que puede invitar a otros usuarios a la actividad)
    usuarios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }],
    creadoPor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    horarios: {
        type: String
    },
    grupo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grupo'
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('Actividades', actividadesSchema, 'actividades')
