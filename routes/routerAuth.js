const express = require('express');
const authController = require('../controllers/authController');
const validationRequest = require('../middlewares/validationRequest');
const checkHasUser = require('../middlewares/checkHasUser');
const auth = require("../middlewares/auth");
const router = express.Router();

/**
* @swagger
* tags:
*   name: Auth
*   description: API для регистрации, аутентификации и авторизации пользователя
* /register:
*   post:
*     summary: Начало процедуры создания пользователя, проверка данных и отправка письма с подтверждением
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/registerRequest'
*     responses:
*       200:
*         description: Письмо отправлено.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   description: Письмо отправлено
*               example:
*                 message: "Письмо отправлено"
*       400:
*         description: Ошибка валидации данных.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 errors:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       type:
*                         type: string
*                         description: Тип поля
*                       value:
*                         type: string
*                         description: Значение поля
*                       msg:
*                         type: string
*                         description: Текст ошибки
*                       path:
*                         type: string
*                         description: Имя поля с ошибкой
*                       location:
*                         type: string
*                         description: Место, где произошла ошибка
*                     example:
*                       type: "field"
*                       value: "1234577777"
*                       msg: "Пароль должен быть не меньше 5 и не больше 8 символов"
*                       path: "password"
*                       location: "body"
*       409:
*         description: Пользователь с такими данными уже существует.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   description: Текст ошибки
*               example:
*                 message: "Такой пользователь уже существует"
*       418:
*         description: Ошибка отправки письма.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   description: Текст ошибки
*               example:
*                 message: "Ошибка отправки письма"
*       500:
*         description: Что-то пошло не так.. гы гы
*
*/
router.post("/register", validationRequest.register, checkHasUser, authController.register);

/**
* @swagger
* /register/confirm:
*   get:
*     summary: Завершение процедуры создания пользователя, запись данных в базу
*     tags: [Auth]
*     parameters:
*       - in: query
*         name: tkey
*         type: string
*         required: true
*         description: Токен из письма подтверждения процедуры регистрации, время жизни 10 мин
*     responses:
*       201:
*         description: Пользователь создан.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/userModel'
*       401:
*         description: Не верный токен в параметре запроса.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   description: Текст ошибки
*               example:
*                 message: "Не верный токен"
*       409:
*         description: Пользователь с такими данными уже существует.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   description: Текст ошибки
*               example:
*                 message: "Такой пользователь уже существует"
*       500:
*         description: Что-то пошло не так.. гы гы
*
*/
router.get("/register/confirm", validationRequest.confirm, checkHasUser, authController.confirm);

/**
* @swagger
* /login:
*   post:
*     summary: Вход пользователя в свою учетную запись
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/loginRequest'
*     responses:
*       200:
*         description: Пользователь залогинен.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/userModel'
*       400:
*         description: Ошибка валидации данных.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 errors:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       type:
*                         type: string
*                         description: Тип поля
*                       value:
*                         type: string
*                         description: Значение поля
*                       msg:
*                         type: string
*                         description: Текст ошибки
*                       path:
*                         type: string
*                         description: Имя поля с ошибкой
*                       location:
*                         type: string
*                         description: Место, где произошла ошибка
*                     example:
*                       type: "field"
*                       value: "1234577777"
*                       msg: "Пароль должен быть не меньше 5 и не больше 8 символов"
*                       path: "password"
*                       location: "body"
*       401:
*         description: Логин или пароль указан не верно.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   description: Текст ошибки
*               example:
*                 message: "Логин или пароль указан не верно"
*       500:
*         description: Что-то пошло не так.. гы гы
*
*/
router.post("/login", validationRequest.login, authController.login);

/**
* @swagger
* /logout:
*   get:
*     summary: Выход пользователя из учетной записи
*     tags: [Auth]
*     security:
*       - apiKeyAuth: []
*     description: В Header authorization должен быть указан токен
*     responses:
*       200:
*         description: Успешная операция выхода из учетной записи
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   description: Пользователь вылогинился успешно
*               example:
*                 message: "Выполнено успешно"
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
*/
router.get("/logout", auth, authController.logout);

/**
* @swagger
* /forgotpassword:
*   post:
*     summary: Восстановление забытого пароля
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/forgotRequest'
*     responses:
*       200:
*         description: Письмо для смены пароля отправлено.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   description: Письмо отправлено
*       400:
*         description: Ошибка валидации данных.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 errors:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       type:
*                         type: string
*                         description: Тип поля
*                       value:
*                         type: string
*                         description: Значение поля
*                       msg:
*                         type: string
*                         description: Текст ошибки
*                       path:
*                         type: string
*                         description: Имя поля с ошибкой
*                       location:
*                         type: string
*                         description: Место, где произошла ошибка
*                     example:
*                       type: "field"
*                       value: "example@email.com"
*                       msg: "Адрес электронной почты не корректный"
*                       path: "email"
*                       location: "body"
*       401:
*         description: Пользователь с таким почтовым адресом не найден.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   description: Текст ошибки
*               example:
*                 message: "Пользователь с таким почтовым адресом не найден"
*       418:
*         description: Ошибка отправки письма.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   description: Текст ошибки
*               example:
*                 message: "Ошибка отправки письма"
*       500:
*         description: Сервер здох.. гы гы
*
*/
router.post("/forgotpassword", validationRequest.forgotpassword, authController.forgotpassword);

/**
* @swagger
* /changepassword:
*   post:
*     summary: Завершение процедуры смены пароля
*     tags: [Auth]
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
router.post("/changepassword", auth, validationRequest.changepassword, authController.changepassword);

module.exports = router
 