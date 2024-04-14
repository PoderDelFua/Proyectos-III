const express = require("express")
const router = express.Router()
const { authMiddleware, authMiddlewareRecovery} = require('../middleware/session')
const { checkUserExists } = require("../middleware/checkUserData")
const { getItems, getItem, updateItem, getItemById, deleteItem, updateActivityData, resetPassword, getActivities, getFavoritos, addFavoritos, removeFavoritos} = require("../controllers/usuario")
const {validatorUpdateUser, validatorUpdateUserActivity, validatorChangePassword, validatorIdFormat} = require("../validators/auth")

const checkRol = require("../middleware/rol")

router.post("/checkUserExists", checkUserExists)

router.get("/getUserData", authMiddleware, getItem)
router.get("/getUsersData/:id", getItemById)
router.get("/getUsersData", getItems)

router.get("/getUserActivities", authMiddleware, getActivities)
router.get("/getUserFavoritos", authMiddleware, getFavoritos)  

router.patch("/addFavoritos/:id", authMiddleware, validatorIdFormat, addFavoritos)
router.patch("/removeFavoritos/:id", authMiddleware, validatorIdFormat, removeFavoritos)  

router.patch("/updateUserData", authMiddleware, validatorUpdateUser, updateItem)
router.patch("/updateActivityData", authMiddleware, validatorUpdateUserActivity, updateActivityData)
router.patch("/resetPassword", authMiddleware, validatorChangePassword, resetPassword)
module.exports = router
