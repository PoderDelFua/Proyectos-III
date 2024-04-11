const express = require("express")
const router = express.Router()
const { authMiddleware, authMiddlewareRecovery} = require('../middleware/session')
const { checkUserExists } = require("../middleware/checkUserData")
const { getItems, getItem, updateItem, deleteItem, updateActivityData, resetPassword} = require("../controllers/usuario")
const {validatorUpdateUser, validatorUpdateUserActivity, validatorChangePassword} = require("../validators/auth")

router.post("/checkUserExists", checkUserExists)
router.get("/getUserData", authMiddleware, getItem)

router.patch("/updateUserData", authMiddleware, validatorUpdateUser, updateItem)
router.patch("/updateActivityData", authMiddleware, validatorUpdateUserActivity, updateActivityData)
router.patch("/resetPassword", authMiddleware, validatorChangePassword, resetPassword)
module.exports = router
