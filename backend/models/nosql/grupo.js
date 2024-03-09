const mongoose = require('mongoose')

const grupoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    miembros: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }],
    actividades: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actividades'
    }],
    descripcion: {
        type: String
    },
    nivel: {
        type: String
    },
    instrumento: {
        type: String
    },
    gusto_musical: {
        type: String
    },
    imagen: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('Grupo', grupoSchema, 'grupo')
