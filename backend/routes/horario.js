
const express = require("express")
const router = express.Router()

const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/horarios")
const { validatorCreateItem, validatorGetItem } = require("../validators/horarios")
const {authMiddleware} = require('../middleware/session')


router.get("/", getItems);

router.get("/:id", validatorGetItem, getItem)

router.post("/", authMiddleware, validatorCreateItem ,createItem)

router.put("/:id",authMiddleware , validatorGetItem, validatorCreateItem, updateItem)

router.delete("/:id", validatorGetItem, deleteItem)

module.exports = router