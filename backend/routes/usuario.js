const express = require("express")
const router = express.Router()
const { getItems, getItem, createItem, updateItem} = require("../controllers/usuario")
router.get("/", getItems)
router.get("/:id", getItem)
router.post("/", createItem)
router.put("/:id", updateItem);
module.exports = router