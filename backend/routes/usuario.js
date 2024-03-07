const express = require("express")
const router = express.Router()
const { authMiddleware } = require('../middleware/session')
const { checkUserExists } = require("../middleware/checkUserData")
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/usuario")


router.post("/checkUserExists", checkUserExists)
router.get("/:id", authMiddleware, getItem)


module.exports = router
