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
    nivel: [{
        type: String
    }],
    prioridad: {
        type: Boolean
    },
    horarios: {
        type: String
    },
    usuarios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
    }],
    creadoPor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    hiloActividad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hilo'
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Storage'
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
