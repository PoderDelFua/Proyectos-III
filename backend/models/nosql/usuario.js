const mongoose = require('mongoose')

//añadir mas campos si lo consideramos necesario, no hace falta _id ya que mongo lo crea por defecto
const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String
    },
    correo: { 
        type: String,
        unique: true 
    },
    password: {
        type: String
    },
    nickname: {
        type: String,
        unique: true
    },
    instrumento:[{
        nombre: { type: String },
        nivel: [{ type: String }]
    }],
    gusto_musical: {
        type: String
    },
    bio: {
        type: String
    },
    horarios: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Horario'
    },
    grupos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grupo'
    }],
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('Usuario', usuarioSchema, 'usuario')
