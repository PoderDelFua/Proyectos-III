const models = {
    usuarioModel: require('./nosql/usuario'),
    actividadesModel: require('./nosql/actividades'),
    horariosModel: require('./nosql/horarios'),
    mensajesModel: require('./nosql/mensajes'),
    storageModel: require('./nosql/storage')    
}

module.exports = models