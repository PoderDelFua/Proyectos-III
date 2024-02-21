const mongoose = require('mongoose');

const rangoSchema = new mongoose.Schema({
    inicio: {
        type: String, // Formato "HH:mm"
        required: true
    },
    fin: {
        type: String, // Formato "HH:mm"
        required: true
    }
}, { _id: false }); // No necesitamos un _id para cada rango, ya que no vamos a referenciarlos
//Guardamos en un array de rango la disponibilidad, podemos poner varios rangos para un mismo día
const disponibilidadSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    lunes: [rangoSchema],
    martes: [rangoSchema],
    miercoles: [rangoSchema],
    jueves: [rangoSchema],
    viernes: [rangoSchema],
    sabado: [rangoSchema],
    domingo: [rangoSchema]
});
module.exports = mongoose.model('Disponibilidad', disponibilidadSchema);
//Lo exportamos como Disponibilidad para que sea más fácil de entender y usar en otros archivos
