const mongoose = require('mongoose');
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
    instrumento: {
        type: String
    },
    bio: {
        type: String
    },
    disponibilidad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Disponibilidad'
    },
    grupos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grupo'
    }],
}, {
    timestamps: true,
    versionKey: false
});


const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
