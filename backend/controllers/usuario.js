const { usuarioModel } = require("../models")

const getItems = async (req, res) => {
    const data = await usuarioModel.find({})
    res.send({data})
   }
   
   const getItem = async (req, res) => {
    //todo
   }
   const createItem = async (req, res) => {
        const { body } = req
        const data = await usuarioModel.create(body)
        console.log(data)
        res.send({data})
    }
    const updateItem = async (req, res) => {
        const { id } = req.params; // Asumiendo que usas el ID del usuario en la ruta como /:id
        const { disponibilidad } = req.body; // Asumiendo que pasas el ID de disponibilidad en el cuerpo de la solicitud
    
        try {
            const data = await usuarioModel.findByIdAndUpdate(
                id,
                { disponibilidad: disponibilidad },
                { new: true } // Esto devuelve el documento actualizado
            );
    
            if (!data) {
                return res.status(404).send({ message: "No se encontró el usuario con el ID proporcionado." });
            }
    
            res.send({ data });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    };
   const deleteItem = (req, res) => {
    //todo
   }

   module.exports = { getItems, getItem,
   createItem, updateItem,
   deleteItem };
   