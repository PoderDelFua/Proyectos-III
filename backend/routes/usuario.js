const express = require("express")
const router = express.Router()
const { authMiddleware } = require('../middleware/session')
const { checkUserExists } = require("../middleware/checkUserData")
const { getItems, getItem, updateItem, deleteItem, updateActivityData} = require("../controllers/usuario")
const {validatorUpdateUser, validatorUpdateUserActivity} = require("../validators/auth")

router.post("/checkUserExists", checkUserExists)
router.get("/getUserData", authMiddleware, getItem)

router.patch("/updateUserData", authMiddleware, validatorUpdateUser, updateItem)
router.patch("/updateActivityData", authMiddleware, validatorUpdateUserActivity, updateActivityData)
module.exports = router
