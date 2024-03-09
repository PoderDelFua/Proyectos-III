const express = require("express")
const router = express.Router()
const { authMiddleware } = require('../middleware/session')
const { getItems, getItem, updateItem, deleteItem, createItem } = require("../controllers/actividades")
const { validatorActivity } = require("../validators/auth")

router.get("/", authMiddleware, getItems)

router.get("/:id", authMiddleware, getItem)
router.put("/:id", authMiddleware, updateItem)
router.post("/", validatorActivity, createItem)
router.delete("/:id", authMiddleware, deleteItem)

module.exports = router
