const express = require("express")
const router = express.Router()

const { authMiddleware } = require('../middleware/session')
const { handleStorage } = require('../utils/handleStorage')

const { getItems, getItem, createItem, updateItem, deleteItem, getHilo, getDistinctGrupos, getMensajesUserTok ,postMensajeUsuarioTok, deleteHilo } = require("../controllers/mensajes")
const { validatorGetItem, validatorCreateItem, validatorUpdateItem, validatorCreateItemTok } = require("../validators/mensajes")

/**
 * @openapi
 * /api/mensajes:
 *  get:
 *      tags:
 *      - Mensajes
 *      summary: Get All messages
 *      description: 'Devuelve todos los mensajes de la base de datos'
 *      responses:
 *          '200':
 *              description: Devuelve todos los mensajes
 *          '500':
 *              description: Server error
 */

router.get("/", getItems)

/**
 * @openapi
 * /api/mensajes/getMsgByID/{id}:
 *  get:
 *      tags:
 *      - Mensajes
 *      summary: Get message by ID
 *      description: 'Devuelve un mensaje por su ID'
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: ID of the message
 *          schema:
 *            type: string
 *            default: "66080979b791711d8c89140d"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */
router.get("/getMsgByID/:id", validatorGetItem, getItem)


/**
 * @openapi
 * /api/mensajes/crearPost:
 *  post:
 *      tags:
 *      - Mensajes
 *      summary: Subir un mensaje/post
 *      description: Sube un nuevo mensaje pidiendo el token
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/mensaje"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 *      security:
 *         - bearerAuth: []
 */
router.post("/crearPost", authMiddleware, validatorCreateItem, createItem)


/**
 * @openapi
 * /api/mensajes/{id}:
 *  patch:
 *      tags:
 *      - Mensajes
 *      summary: Modifocar mensaje/post con su ID
 *      description: Modifica un mensaje/post por su ID
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: ID del mensaje a modificar
 *          schema:
 *            type: string
 *            default: "65f22f0800c7c18e6fa74aaa"
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/mensaje"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 *      security:
 *         - bearerAuth: []
 */
router.patch("/:id", authMiddleware, validatorGetItem, validatorUpdateItem,  updateItem)

/**
 * @openapi
 * /api/mensajes/{id}:
 *  delete:
 *      tags:
 *      - Mensajes
 *      summary: Borrar mensaje/post con su ID
 *      description: Borra un mensaje/post por su ID
 *      parameters:
 *          -   name: id
 *              in: path
 *              required: true
 *              description: ID del mensaje a borrar
 *              schema:
 *                  type: string
 *                  default: "65f22f0800c7c18e6fa74aaa"   
 *      responses:
 *          '200':
 *              description: Returns the deleted object
 *          '401':
 *              description: Validation error
 *      security:
 *          - bearerAuth: []
 * 
 */
router.delete("/:id", authMiddleware, validatorGetItem, deleteItem)


/**
 * @openapi
 * /api/mensajes/hilo/{grupo}:
 *  get:
 *      tags:
 *      - Mensajes
 *      summary: Todos los mensajes de un hilo
 *      description: 'Devuelve todos los mensajes de un hilo/grupo en concreto'
 *      parameters:
 *          -   name: grupo
 *              in: path
 *              required: true
 *              description: Grupo del hilo
 *              schema:
 *                  type: string
 *                  default: "FLAMENCO"
 * 
 *      responses:
 *          '200':
 *              description: Devuelve todos los mensajes del grupo
 *          '500':
 *              description: Server error
 */
router.get("/hilo/:grupo", getHilo)     //Para obtener los mensajes de un hilo



/**
 * @openapi
 * /api/mensajes/deleteHilo/{grupo}:
 *  delete:
 *      tags:
 *      - Mensajes
 *      summary: Borrar todos los mensajes de un hilo/grupo
 *      description: Borra todos los mensajes de un hilo/grupo en concreto. Recordad que es case sensitive
 *      parameters:
 *          -   name: grupo
 *              in: path
 *              required: true
 *              description: Nombre del grupo a borrar
 *              schema:
 *                  type: string
 *                  default: "FLAMENCO"   
 *      responses:
 *          '200':
 *              description: Devuelve el numero de mensajes borrados
 *          '401':
 *              description: Validation error
 *      security:
 *          - bearerAuth: []
 * 
 */
router.delete("/deleteHilo/:grupo", authMiddleware, deleteHilo) //Para borrar un hilo


/**
 * @openapi
 * /api/mensajes/distinctGrupos/:
 *  get:
 *      tags:
 *      - Mensajes
 *      summary: Los distintos hilos/grupos de mensajes
 *      description: 'Devuelve los distintos grupos de mensajes'
 *      responses:
 *          '200':
 *              description: Devuelve todos los grupos
 *          '500':
 *              description: Server error
 */
router.get("/distinctGrupos/", getDistinctGrupos) //Para obtener los grupos distintos


/**
 * @openapi
 * /api/mensajes/getMensajesUserTok:
 *  get:
 *      tags:
 *      - Mensajes
 *      summary: Todos los mensajes de un usuario
 *      description: Usando el token del usuario, devuelve todos los mensajes de un usuario escritos en cualquier sitio
 *      responses:
 *          '200':
 *              description: Devuelve todos los mensajes del grupo borrados
 *          '401':
 *              description: Validation error
 *      security:
 *          - bearerAuth: []
 * 
 */
router.get("/getMensajesUserTok", authMiddleware, getMensajesUserTok)

module.exports = router