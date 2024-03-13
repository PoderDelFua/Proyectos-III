const express = require("express")
const router = express.Router()
const { authMiddleware } = require('../middleware/session')
const { checkUserExists } = require("../middleware/checkUserData")
const { getItems, getItem, updateItem, deleteItem } = require("../controllers/usuario")
const {validatorUpdateUser} = require("../validators/auth")

router.post("/checkUserExists", checkUserExists)
router.get("/:id", authMiddleware, getItem)

router.patch("/:id", authMiddleware, validatorUpdateUser, updateItem)

module.exports = router
