const express = require("express")
const router = express.Router()

const { authMiddleware } = require('../middleware/session')
const { handleStorage } = require('../utils/handleStorage')

const { getItems, getItem, createItem, updateItem, deleteItem, getHilo, getMensajesUserTok, likeMsg, removeLikeMsg, postMensajeUsuarioTok, getRespuestasById } = require("../controllers/mensajes")
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
 *            default: "66153d12248271dc8c36d80e"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */
router.get("/getMsgByID/:id", validatorGetItem, getItem)


/**
 * @openapi
 * /api/mensajes/getMsgHilo/{id}:
 *  get:
 *      tags:
 *      - Mensajes
 *      summary: Todos los mensajes de un hilo
 *      description: 'Devuelve todos los mensajes de un hilo en concreto'
 *      parameters:
 *          -   name: id
 *              in: path
 *              required: true
 *              description: Id del hilo
 *              schema:
 *                  type: string
 *                  default: "66146d4eadc5e52407a6eb04"
 * 
 *      responses:
 *          '200':
 *              description: Devuelve todos los mensajes del hilo
 *          '500':
 *              description: Server error
 */
router.get("/getMsgHilo/:id", validatorGetItem, getHilo)    


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

router.get("/getRespuestasById/:id", validatorGetItem, getRespuestasById)
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

router.post("/crearPostTok", authMiddleware, validatorCreateItemTok, postMensajeUsuarioTok)

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
 *            default: "6615382a30e57b4421aba40a"
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
 * /api/mensajes/likeMsg/{id}:
 *  patch:
 *      tags:
 *      - Mensajes
 *      summary: Añade un like a un mensaje
 *      description: Usa el ID del mensaje para añadir un like
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: ID del mensaje con nuevo like
 *          schema:
 *            type: string
 *            default: "661bc0e807f697bd07799670"
 *      responses:
 *          '200':
 *              description: Returns the updated object
 *          '401':
 *              description: Validation error
 *      security:
 *         - bearerAuth: []
 */
router.patch("/likeMsg/:id", authMiddleware, validatorGetItem, likeMsg)

/**
 * @openapi
 * /api/mensajes/likeMsg/{id}:
 *  patch:
 *      tags:
 *      - Mensajes
 *      summary: Resta un like a un mensaje
 *      description: Usa el ID del mensaje para restar un like
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: ID del mensaje para restar un like
 *          schema:
 *            type: string
 *            default: "661bc0e807f697bd07799670"
 *      responses:
 *          '200':
 *              description: Returns the updated object
 *          '401':
 *              description: Validation error
 *      security:
 *         - bearerAuth: []
 */
router.patch("/removeLikeMsg/:id", authMiddleware, validatorGetItem, removeLikeMsg)



module.exports = router