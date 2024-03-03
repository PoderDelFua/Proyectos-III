const express = require("express")
const router = express.Router()
const { checkUserExists, checkLogin } = require("../middleware/checkUserData")
const { validatorGetItem, validatorCreateItem, validatorGetItemWithID } = require("../validators/usuario")
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/usuario")


router.get("/",validatorGetItem, getItems)
router.get("/:id", validatorGetItemWithID, getItem)

router.post("/checkUserExists", checkUserExists)
router.post("/checkLogin", checkLogin)
router.post("/", validatorCreateItem, createItem)

router.put("/:id", validatorGetItemWithID, updateItem)

router.delete("/:id",validatorGetItemWithID, deleteItem)

module.exports = router