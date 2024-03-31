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
    horarios: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Horarios'
    },
    grupos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grupo'
    }],
}, {
    timestamps: true,
    versionKey: false
})


usuarioSchema.statics.findAllData = function() {
    //console.log("hola desde all data")
    // "this." hace referencia a su propio modelo
    const joinData = this.aggregate([
        {
            // lookup =~ join (STAGE 1)
            $lookup: {
                from: "horarios",
                localField: "horarios", // tracks.mediaId
                foreignField: "_id",   // storages._id
                as: "horario_despliegue" // Alias audio
            }
        },
      /*{
            // From left join to inner join (STAGE 2) 
            $unwind:"$audio"
        } */
    ])
    return joinData
}

usuarioSchema.statics.findOneData = function(id) {
    console.log(id)
    // "this." hace referencia a su propio modelo
    const joinData = this.aggregate([
        {
            // Match by id (STAGE 1)
            $match: {
                _id: mongoose.Types.ObjectId(id)
            }
        },
        {
            // lookup =~ join (STAGE 2)
            $lookup: {
                from: "Horarios",
                localField: "horarios", // tracks.mediaId
                foreignField: "_id",   // storages._id
                as: "horario_despliegue" // Alias audio
            }
        },
        {
            // Unwind the horario_despliegue array (STAGE 3)
            $unwind: "$horario_despliegue"
        }
    ])
    return joinData
}


module.exports = mongoose.model('Usuario', usuarioSchema, 'usuario')
