const mongoose = require('mongoose')

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
    timestamp: {
        type: Date,
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
    }

}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('Mensajes', mensajes, 'mensajes')