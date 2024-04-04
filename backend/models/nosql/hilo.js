const mongoose = require('mongoose')

const hiloSchema = new mongoose.Schema({
    nombreUsuario: { 
        type: String, 
        required: true 
    },
    titulo: { 
        type: String, 
        required: true 
    },
    texto: { 
        type: String, 
        required: true 
    },
    tag: { 
        type: String, 
        required: true 
    } 
}, { 
    timestamps: true 
})

module.exports = mongoose.model('Hilo', hiloSchema)
