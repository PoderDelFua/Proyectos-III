const express = require('express')
const router = express.Router()
const { registerCtrl, loginCtrl } = require("../controllers/auth")
const { validatorRegister, validatorLogin} = require("../validators/auth")
const { checkUserExists } = require("../middleware/checkUserData")

//POST http://localhost:9000/api/auth/register
router.post("/register", validatorRegister, registerCtrl)

//POST http://localhost:9000/api/auth/login
router.post("/login", validatorLogin, loginCtrl) 
module.exports = router