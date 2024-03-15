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
        nombre: { type: String },
        nivel: [{ type: String }]
    }],
    prioridad: {
        type: Boolean
    },
    usuarios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }],
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
