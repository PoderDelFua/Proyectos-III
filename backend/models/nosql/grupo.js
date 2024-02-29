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
    // Puedes añadir más campos aquí según tus necesidades
})

module.exports = mongoose.model('Grupo', grupoSchema, 'grupo')
