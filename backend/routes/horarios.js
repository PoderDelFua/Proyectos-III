
const express = require("express")
const router = express.Router()

const { getItems, getItem, createItem, updateItem, patchItem, deleteItem } = require("../controllers/horarios")
const { validatorCreateItem, validatorGetItem, validatorUpdateItem } = require("../validators/horarios")
const {authMiddleware} = require('../middleware/session')


router.get("/", getItems);

router.get("/:id", validatorGetItem, getItem)

router.post("/", authMiddleware, validatorCreateItem ,createItem)

router.put("/:id",authMiddleware , validatorGetItem, validatorCreateItem, updateItem)

router.patch("/:id",authMiddleware , validatorGetItem, validatorUpdateItem, patchItem)

router.delete("/:id", validatorGetItem, deleteItem)

module.exports = router