const express = require("express")
const router = express.Router()
const checkUserExists = require("../middlewares/checkUserExists");
const {validatorGetItem, validatorCreateItem, validatorGetItemWithID} = require("../validators/usuario")
const { getItems, getItem, createItem, loginCheck, updateItem, deleteItem } = require("../controllers/usuario");


router.get("/",validatorGetItem, getItems)
router.get("/:id", validatorGetItemWithID, getItem)

//router.post("/", validatorCreateItem, createItem)
router.post("/checkUserExists", checkUserExists)
router.post("/loginCheck", validatorGetItem, loginCheck)
router.post("/", [validatorCreateItem, checkUserExists], createItem);

router.put("/:id",validatorGetItemWithID, updateItem)

router.delete("/:id",validatorGetItemWithID, deleteItem)

module.exports = router