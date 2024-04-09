const mongoose = require('mongoose')
const mongooseDelete = require("mongoose-delete")

const mensajes = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    creadorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    privado: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
})

mensajes.plugin(mongooseDelete, { overrideMethods: 'all' })
module.exports = mongoose.model('Hilo', mensajes, 'hilo')