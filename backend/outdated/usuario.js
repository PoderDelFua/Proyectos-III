const express = require("express")
const router = express.Router()
const { checkUserExists, checkLogin } = require("../middleware/checkUserData")
const { validatorGetItem, validatorCreateItem, validatorGetItemWithID } = require("../validators/auth")
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/usuario")
const { authMiddleware } = require("../middleware/session")

router.get("/", authMiddleware, getItem)
router.get("/:id", validatorGetItemWithID, getItem)

router.post("/checkUserExists", checkUserExists)
router.post("/checkLogin", checkLogin)
router.post("/", validatorCreateItem, createItem)

router.put("/:id", validatorGetItemWithID, updateItem)

router.delete("/:id",validatorGetItemWithID, deleteItem)
//Route desactualizado, usamos auth.js
module.exports = router