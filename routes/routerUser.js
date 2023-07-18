const express = require('express');
const userController = require('../controllers/userController');
const validationRequest = require('../middlewares/validationRequest');
const auth = require("../middlewares/auth");
const { uploadImage } = require('../middlewares/uploadImage');
const router = express.Router();

/**
* @swagger
* tags:
*   name: User
*   description: Работа с данными пользователя
* /user/update:
*   post:
*     summary: Обновление данных пользователя
*     tags: [User]
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
router.post("/user/update", auth, validationRequest.update, userController.update);

/**
* @swagger
* /user/avatar:
*   post:
*     summary: Завершение процедуры смены пароля
*     tags: [User]
*     security:
*       - apiKeyAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/changePasswordRequest'
*     responses:
*       201:
*         description: Ответ при удачной смене пароля.
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
router.post("/user/avatar", auth, uploadImage.single("avatar"), userController.avatar);


router.delete("/user/avatar", auth, userController.deleteAvatar);

/**
* @swagger
* /user/profile:
*   post:
*     summary: Завершение процедуры смены пароля
*     tags: [User]
*     security:
*       - apiKeyAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/changePasswordRequest'
*     responses:
*       201:
*         description: Ответ при удачной смене пароля.
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
router.get("/user/profile", auth, userController.profile);


module.exports = router
 