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
        type: [String]
    },
    bio: {
        type: String
    },
    role:{
        type: String,
        enum: ["user", "admin"], // es como el enum de SQL
        default: "user"
    },
    fotoPerfil: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Storage'
    },
    horarios: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Horarios'
    },
    grupos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grupo'
    }],
    actividades: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actividades',
    }],
    favoritos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actividades', 
    }],
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mensajes'
    }],
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Usuario', usuarioSchema, 'usuario');

