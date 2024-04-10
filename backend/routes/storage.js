const express = require("express")
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage")
const { getItem, getItems, createItem, deleteItem } = require("../controllers/storage")
const { validatorGetItem } = require('../validators/storage')

/**
 * @openapi
 * /api/storage/:
 *   get:
 *     tags:
 *     - Storage 
 *     summary: Get all items
 *     description: Retrieve a list of all items
 *     responses:
 *       200:
 *         description: Successful operation
 */
router.get("/", getItems)

/**
 * @openapi
 * /api/storage/{id}:
 *   get:
 *     tags:
 *     - Storage
 *     summary: Get item by ID
 *     description: Retrieve an item by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Item not found
 */
router.get("/:id", validatorGetItem, getItem)

/**
 * @openapi
 * /api/storage/postImg:
 *   post:
 *     tags:
 *     - Storage
 *     summary: Upload image JPEG, JPG, PNG or GIF 
 *     description: No he probadoc on otros tipos de archivos pero tal vez funciona
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successful operation
 */
router.post("/postImg", uploadMiddleware.single("image"), createItem)

/**
 * @openapi
 * /api/storage/postFile:
 *   post:
 *     tags:
 *     - Storage 
 *     summary: Upload file
 *     description: Upload a file
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successful operation
 */
router.post("/postFile", uploadMiddleware.single("file"), createItem)


/**
 * @openapi
 * /api/storage/postVideo:
 *   post:
 *     tags:
 *     - Storage
 *     summary: Upload video
 *     description: Upload a video file
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               video:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successful operation
 */
router.post("/postVideo", uploadMiddleware.single("video"), createItem)


/**
 * @openapi
 * /api/storage/{id}:
 *   delete:
 *     tags:
 *     - Storage
 *     summary: Delete item by ID
 *     description: Delete an item by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Item not found
 */
router.delete("/:id", validatorGetItem, deleteItem);

module.exports = router;