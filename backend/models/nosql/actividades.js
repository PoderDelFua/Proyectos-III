const mongoose = require('mongoose')

const actividadesSchema = new mongoose.Schema({
    nombre: {
        type: String
    },
    descripcion: {
        type: String
    },
    fecha: {
        type: Date
    },
    lugar: {
        type: String
    },
    gusto_musical: {
        type: String
    },
    instrumento:[{
        nombre: { type: String },
        nivel: [{ type: String }]
    }],

    usuarios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }],
    grupo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grupo'
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('Actividades', actividadesSchema, 'actividades')
