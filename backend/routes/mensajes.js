const express = require("express")
const router = express.Router()

const { authMiddleware } = require('../middleware/session')

const { getItems, getItem, createItem, updateItem, deleteItem, getHilo } = require("../controllers/mensajes")
const { validatorGetItem, validatorCreateItem, validatorUpdateItem } = require("../validators/mensajes")

router.get("/", getItems)
router.get("/:id", validatorGetItem, getItem)
router.post("/", authMiddleware, validatorCreateItem, createItem)
router.patch("/:id", authMiddleware, validatorGetItem, validatorUpdateItem,  updateItem)
router.delete("/:id", authMiddleware, validatorGetItem, deleteItem)

router.get("/hilo/:grupo", getHilo)

module.exports = router