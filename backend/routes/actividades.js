const express = require("express")
const router = express.Router()
const { authMiddleware } = require('../middleware/session')
const { getItems, getItem, updateItem, deleteItem, createItem,getItemsByUser} = require("../controllers/actividades")
const { validatorActivity, validatorUpdateActivity, validatorIdFormat} = require("../validators/auth")

/**
 * @openapi
 * /api/actividades/getActivityData:
 *  get:
 *      tags:
 *      - Actividades
 *      summary: Get All Actividades
 *      description: 'Devuelve todos las actividades de la base de datos'
 *      responses:
 *          '200':
 *              description: Devuelve todos las Actividades
 *          '500':
 *              description: Server error
 */
router.get("/getActivityData", getItems)

/**
 * @openapi
 * /api/actividades/getActivityData/{id}:
 *  get:
 *      tags:
 *      - Actividades
 *      summary: Get Actividad by ID
 *      description: 'Devuelve iuna sola actividad por su ID'
 *      parameters:
 *          -   name: id
 *              in: path
 *              required: true
 *              description: ID de la actividad que queremos obtener
 *              schema:
 *                  type: string
 *                  default: "65ec99e310fb5cb916394f5a"
 *      responses:
 *          '200':
 *              description: Devuelve la Actividad solicitada
 *          '401':
 *              description: Validation error
 *          '500':
 *              description: Server error
 */
router.get("/getActivityData/:id", validatorIdFormat, getItem)


/**
 * @openapi
 * 
 * /api/actividades/getActivityDataByUser/{id}:
 *  get:
 *      tags:
 *      -   Actividades
 *      summary: Devuelve las actividades creadas por un usuarioID
 *      description: 'Devuelve las actividades creadas por un usuario utilizando el ID del usuario'
 *      parameters:
 *          -   name: id
 *              in: path
 *              required: true
 *              description: ID del usuario del que queremos obtener las actividades
 *              schema:
 *                  type: string
 *                  default: "65ec99e310fb5cb916394f5a"
 *      responses:
 *          '200':
 *              description: Devuelve el hilo borrado
 *          '401':
 *              description: Validation error
 *      security:
 *          - bearerAuth: [] 
 */    
router.get("/getActivityDataByUser/:id", authMiddleware, getItemsByUser)


/**
 * @openapi
 * /api/actividades/addUserToActivity:
 *  patch:
 *    tags:
 *      - Actividades
 *    summary: Añade un usuario a una Actividad 
 *    description: 'Solo Se le pasa el ID de la actividad y el ID del usuario a añadir a la actividad'
 * 
 */
router.patch("/addUserToActivity", authMiddleware,validatorUpdateActivity, updateItem)

/**
 * @openapi
 * /api/actividades/createActivity:
 *  post:
 *      tags:
 *      - Actividades
 *      summary: Crea una Actividad 
 *      description: 'Solo Se le pasa el ID de la actividad y el ID del usuario a añadir a la actividad'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/actividades'
 *      responses:
 *          '200':
 *              description: Devuelve la actividad creada
 *          '401':
 *              description: Validation error
 * 
 */
router.post("/createActivity", validatorActivity, createItem)


/**
 * @openapi
 * /api/actividades/{id}:
 *  delete:
 *    tags:
 *      - Actividades
 *    summary: Delete Activity by Id
 *    description: 'Delete Activity by ID'
 *    parameters:
 *          -   name: id
 *              in: path
 *              required: true
 *              description: ID de la actividad que queremos eliminar
 *              schema:
 *                  type: string
 *                  default: "66146e1ca67dd22fcfc14f1b"
 *    responses:
 *      '200':
 *          description: Devuelve la actividad eliminada
 *      '401':
 *          description: Validation error
 *    security:
 *      - bearerAuth: []
 * 
 */
router.delete("/:id", authMiddleware, deleteItem)



module.exports = router
