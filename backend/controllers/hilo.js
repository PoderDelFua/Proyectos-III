const models = require('../models');

exports.crearHilo = async (req, res) => {
  try {
    const { nombreUsuario, titulo, texto, tag } = req.body;
    const nuevoHilo = await models.hiloModel.create({ nombreUsuario, titulo, texto, tag });
    res.status(201).json(nuevoHilo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
