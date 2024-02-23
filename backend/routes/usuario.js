const express = require("express")
const router = express.Router()
const { getItems, getItem, createItem, checkUserExists, loginCheck, updateItem} = require("../controllers/usuario")
router.get("/", getItems)
router.get("/:id", getItem)
router.post("/", createItem);
router.post("/checkUserExists", checkUserExists);
router.post("/loginCheck", loginCheck);
router.put("/:id", updateItem);
module.exports = router;