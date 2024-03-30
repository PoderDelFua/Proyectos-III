const express = require("express")
const router = express.Router()

const { authMiddleware } = require('../middleware/session')

const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/mensajes")

router.get("/", getItems)
router.get("/:id", getItem)
router.post("/", authMiddleware, createItem)
router.patch("/", authMiddleware, updateItem)
router.delete("/:id", authMiddleware, deleteItem)



module.exports = router