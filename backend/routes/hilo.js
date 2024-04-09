const express = require("express")
const router = express.Router()
const { authMiddleware } = require('../middleware/session')
const { getItems, getItem, updateItem, deleteItem, createItem, createItemTok, getMsgHilo} = require("../controllers/hilo")
const { validatorCreateItem, validatorCreateItemTok, validatorGetItem, validatorUpdateItem, test } = require("../validators/hilo")

/**
 * @openapi
 * /api/hilo:
 *  get:
 *      tags:
 *      - Hilo
 *      summary: Get All hilos
 *      description: 'Devuelve todos los hilos de la base de datos'
 *      responses:
 *          '200':
 *              description: Devuelve todos los hilos
 *          '500':
 *              description: Server error
 */
router.get("/", getItems)

/**
 * @openapi
 * /api/hilo/getHiloById/{id}:
 *  get:
 *      tags:
 *      - Hilo
 *      summary: Get hilo by ID
 *      description: 'Devuelve un hilo por su ID'
 *      parameters:
 *          -   name: id
 *              in: path
 *              required: true
 *              description: ID del hilo que queremos obtener
 *              schema:
 *                  type: string
 *                  default: "66146e1ca67dd22fcfc14f1b"
 *      responses:
 *          '200':
 *              description: Devuelve el hilo solicitado
 *          '401':
 *              description: Validation error
 */
router.get("/getHiloById/:id", validatorGetItem, getItem)

/**
 * @openapi
 * /api/hilo/getMsgHilo/{id}:
 *  get:
 *      tags:
 *      - Hilo
 *      summary: Get mensajes de un Hilo by ID
 *      description: 'Devuelve los mensajes de un hilo ordenados por fecha de modificacion descendente utilizando el ID del hilo'
 *      parameters:
 *          -   name: id
 *              in: path
 *              required: true
 *              description: ID del hilo del que queremos los mensajes
 *              schema:
 *                  type: string
 *                  default: "66146e1ca67dd22fcfc14f1b"
 *      responses:
 *          '200':
 *              description: Devuelve los mensajes solicitados
 *          '401':
 *              description: Validation error
 */
router.get("/getMsgHilo/:id", validatorGetItem, getMsgHilo)


/**
 * @openapi
 * /api/hilo:
 *  post:
 *      tags:
 *      - Hilo
 *      summary: Create a new hilo
 *      description: 'Crea un nuevo hilo en la base de datos'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/hilo'
 *      responses:
 *          '200':
 *              description: Devuelve el hilo creado
 *          '401':
 *              description: Validation error
 *      security:
 *          - bearerAuth: []
 */
router.post("/", authMiddleware, validatorCreateItem, createItem)

/**
 * @openapi
 * /api/hilo/tok:
 *  post:
 *      tags:
 *      - Hilo
 *      summary: Create a new hilo
 *      description: 'Crea un nuevo hilo en la base de datos'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          titulo:
 *                              type: string
 *                              default: "Sin espesificar el creador del hilo"
 *                          descripcion:
 *                              type: string
 *                              default: "🪀"
 *      responses:
 *          '200':
 *              description: Devuelve el hilo creado
 *          '401':
 *              description: Validation error
 *      security:
 *          - bearerAuth: []
 */
router.post("/tok", authMiddleware, validatorCreateItemTok, createItemTok)

/**
 * @openapi
 * /api/hilo/{id}:
 *  patch:
 *      tags:
 *      - Hilo
 *      summary: Modifica a new hilo
 *      description: 'Modifica un nuevo hilo en la base de datos. Con masarle un solo campo ya se modifica todo el hilo'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                  type: object
 *                  properties:
 *                      titulo: String
 *                      default: "Hilo modificado 👻"
 *          parameters:
 *          -   name: id
 *              in: path
 *              required: true
 *              description: ID del hilo que queremos modificar los mensajes
 *              schema:
 *                  type: string
 *                  default: "66146e1ca67dd22fcfc14f1b"
 *         
 *      responses:
 *          '200':
 *              description: Devuelve el hilo creado
 *          '401':
 *              description: Validation error
 *      security:
 *          - bearerAuth: []
 */
router.patch("/:id", authMiddleware, validatorGetItem, validatorUpdateItem,  updateItem)


/**
 * @openapi
 * /api/hilo/{id}:
 *  delete:
 *      tags:
 *      - Hilo
 *      summary: Delete a hilo
 *      description: 'Borra un hilo de la base de datos Junto con todos los mensajes que contenga. Se le pasa el ID del hilo a borrar mediante parametros'
 *      parameters:
 *          -   name: id
 *              in: path
 *              required: true
 *              description: ID del hilo que queremos borrar
 *              schema:
 *                  type: string
 *                  default: "66159423b152ee40df7f9eda"
 *      responses:
 *          '200':
 *              description: Devuelve el hilo borrado
 *          '401':
 *              description: Validation error
 *      security:
 *          - bearerAuth: []
 */
router.delete("/:id", authMiddleware, validatorGetItem, deleteItem)


module.exports = router