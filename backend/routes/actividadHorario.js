
const express = require("express")
const router = express.Router()

const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/actividadHorario")
const { validatorCreateItem} = require("../validators/actividadHorario")
const { validatorGetItem } = require("../validators/actividadHorario")

router.get("/", getItems)
router.get("/:id", validatorGetItem, getItem)

router.post("/", validatorCreateItem, createItem)

router.put("/:id", validatorGetItem, validatorCreateItem, updateItem)

router.delete("/:id", validatorGetItem, deleteItem)

module.exports = router
