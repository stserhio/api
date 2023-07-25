const express = require('express');
const validationRequest = require('../middlewares/validationRequest');
const auth = require("../middlewares/auth");
const { uploadImage } = require('../middlewares/uploadImage');
const postController = require('../controllers/postController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Post
 *   description: Работа с данными пользователя
 * /post/create:
 *   post:
 *     summary: Обновление данных пользователя
 *     tags: [Post]
 *     security:
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/changePasswordRequest'
 *     responses:
 *       200:
 *         description: Ответ при удачной смене данных.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Пароль изменён
 *               example:
 *                 message: "Пароль изменён"
 *       401:
 *         description: Токен не действительный.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/verifyTokenFailed'
 *       403:
 *         description: Токен обязателен.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/verifyTokenExist'
 *       500:
 *         description: Что-то пошло не так.. гы гы
 *
 */
router.post("/post/create", auth, uploadImage.array("gallery", 10), validationRequest.post, postController.postCreate);



router.delete("/post/:postId", auth, postController.postDelete);


router.get("/posts/:userId", auth, postController.getAll);


router.get("/post/:id", auth, postController.getOne);


module.exports = router