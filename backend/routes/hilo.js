const express = require("express")
const router = express.Router()
const { authMiddleware } = require('../middleware/session')
const { getItems, getItem, updateItem, deleteItem, createItem, createItemTok, getMsgHilo} = require("../controllers/hilo")
const { validatorCreateItem, validatorCreateItemTok, validatorGetItem, validatorUpdateItem, test } = require("../validators/hilo")

router.get("/", getItems)
router.get("/getHiloById/:id", validatorGetItem, getItem)
router.get("/getMsgHilo/:id", validatorGetItem, getMsgHilo)

router.post("/", authMiddleware, validatorCreateItem, createItem)
router.post("/tok", authMiddleware, validatorCreateItemTok, createItemTok)

router.patch("/:id", authMiddleware, validatorGetItem, validatorUpdateItem,  updateItem)

router.delete("/:id", authMiddleware, validatorGetItem, deleteItem)


module.exports = router