const hilo = require('./nosql/hilo')

const models = {
    usuarioModel: require('./nosql/usuario'),
    actividadesModel: require('./nosql/actividades'),
    horariosModel: require('./nosql/horarios'),
    hiloModel: require('./nosql/hilo'),
    mensajesModel: require('./nosql/mensajes'),
    storageModel: require('./nosql/storage')    
}

module.exports = models