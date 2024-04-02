const express = require("express")
const router = express.Router()

const { authMiddleware } = require('../middleware/session')
const { handleStorage } = require('../utils/handleStorage')

const { getItems, getItem, createItem, updateItem, deleteItem, getHilo, getDistinctGrupos, getMensajesUserTok ,postMensajeUsuarioTok } = require("../controllers/mensajes")
const { validatorGetItem, validatorCreateItem, validatorUpdateItem, validatorCreateItemTok } = require("../validators/mensajes")

router.get("/", getItems)
router.get("/getMsgByID/:id", validatorGetItem, getItem)
router.post("/", authMiddleware, validatorCreateItem, createItem)
router.patch("/:id", authMiddleware, validatorGetItem, validatorUpdateItem,  updateItem)
router.delete("/:id", authMiddleware, validatorGetItem, deleteItem)


router.get("/hilo/:grupo", getHilo)     //Para obtener los mensajes de un hilo
router.get("/distinctGrupos/", getDistinctGrupos) //Para obtener los grupos distintos
router.get("/getMensajesUserTok", authMiddleware, getMensajesUserTok)

router.post("/postTokUsuario", authMiddleware, validatorCreateItemTok, postMensajeUsuarioTok)

module.exports = router