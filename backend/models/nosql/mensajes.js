const mongoose = require('mongoose')
const mongooseDelete = require("mongoose-delete")

const mensajes = new mongoose.Schema({
    autorMensaje: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    mensaje: {
        type: String,
        required: true
    },
    grupo:{
        type: String,
        required: true
    },
    padreMensaje: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mensajes',
        required: false
    },
    mediaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Storage',
        required: false
    }
}, {
    timestamps: true,
    versionKey: false
})

mensajes.plugin(mongooseDelete, { overrideMethods: 'all' })
module.exports = mongoose.model('Mensajes', mensajes, 'mensajes')