const express = require("express")
const router = express.Router()
const { authMiddleware } = require('../middleware/session')
const { getItems, getItem, updateItem, deleteItem, createItem,getItemsByUser} = require("../controllers/actividades")
const { validatorActivity, validatorUpdateActivity} = require("../validators/auth")


router.get("/getActivityData", getItems)
router.patch("/addUserToActivity", authMiddleware,validatorUpdateActivity, updateItem)
router.post("/createActivity", validatorActivity, createItem)
router.delete("/:id", authMiddleware, deleteItem)
router.get("/getActivityDataByUser/:id", authMiddleware, getItemsByUser)

module.exports = router
