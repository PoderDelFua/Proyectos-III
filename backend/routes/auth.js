const express = require('express')
const router = express.Router()
const { registerCtrl, loginCtrl, forgotPasswordCtrl, recoverPassCtrl } = require("../controllers/auth")
const { validatorRegister, validatorLogin, validatorForgotPassword, validatorChangePassword} = require("../validators/auth")
const { checkUserExists } = require("../middleware/checkUserData")

//POST http://localhost:9000/api/auth/register
router.post("/register", validatorRegister, registerCtrl)

//POST http://localhost:9000/api/auth/login

/**
 * @openapi
 * /api/auth/login:
 *  post:
 *      tags:
 *      - Auth
 *      summary: Login usuario y devuelve token
 *      description: Iniciar sesión y devuelve un token
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          correo:
 *                              type: string
 *                              example: "frankiTest@live.u-tad.com"
 *                          password:
 *                              type: string
 *                              example: "123456"
 *      responses:
 *          '200':
 *              description: Devuelve el token de sesión
 *          '401':
 *              description: Validation error
 * 
 *
 * 
 */
router.post("/login", validatorLogin, loginCtrl)
//router.post("/recover/:token",validatorChangePassword, recoverPassCtrl)

router.post("/forgot-password", validatorForgotPassword, forgotPasswordCtrl)

module.exports = router