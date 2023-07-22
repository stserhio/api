const { validationResult, checkSchema } = require('express-validator');
const jwt = require("jsonwebtoken");

/**
 * @swagger
 * components:
 *   schemas:
 *     registerRequest:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         firstName:
 *           type: string
 *           maxLength: 30
 *           description: Имя пользователя
 *         lastName:
 *           type: string
 *           maxLength: 30
 *           description: Фамилия пользователя
 *         email:
 *           type: string
 *           maxLength: 100
 *           description: Адрес почты
 *         password:
 *           type: string
 *           minLength: 3
 *           maxLength: 8
 *           description: Пароль пользователя
 *       example:
 *         firstName: "Jone"
 *         lastName: "Dou"
 *         email: "example@mail.com"
 *         password: "12345"
 */
exports.register = async (req, res, next) => {

    const schemaObject = checkSchema({
        firstName: {
            exists: {
                errorMessage: 'Отсутствует параметр',
                bail: true
            },
            trim: true,
            escape: true,
            notEmpty: {
                errorMessage: 'Поле не должно быть пустым',
                bail: true
            },
            isLength: {
                options: { max: 30 },
                errorMessage: 'Имя не должно быть больше 30 символов',
            }
        },
        lastName: {
            exists: {
                errorMessage: 'Отсутствует параметр',
                bail: true
            },
            trim: true,
            escape: true,
            notEmpty: {
                errorMessage: 'Поле не должно быть пустым',
                bail: true
            },
            isLength: {
                options: { max: 30 },
                errorMessage: 'Имя не должно быть больше 30 символов',
            }
        },
        password: {
            exists: {
                errorMessage: 'Поле должно быть заполнено',
                bail: true
            },
            isLength: {
                options: { min: 5, max: 8 },
                errorMessage: 'Пароль должен быть не меньше 5 и не больше 8 символов',
            }
        },
    });

    await schemaObject.run(req);

    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    return res.status(400).json({ errors: errors.array() });
}

exports.confirm = async (req, res, next) => {
    try {
        req.body = await jwt.verify(req.query.tkey, process.env.TOKEN_KEY);
    } catch (err) {
        return res.status(401).json({"message": "Не верный токен"});
    }

    return next();
}

/**
 * @swagger
 * components:
 *   schemas:
 *     loginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           maxLength: 100
 *           description: Адрес почты
 *         password:
 *           type: string
 *           minLength: 3
 *           maxLength: 8
 *           description: Пароль пользователя
 *       example:
 *         email: "example@mail.com"
 *         password: "12345"
 */
exports.login = async (req, res, next) => {

    const schemaObject = checkSchema({
        email: {
            exists: {
                errorMessage: 'Отсутствует параметр',
                bail: true
            },
            trim: true,
            toLowerCase: true,
            notEmpty: {
                errorMessage: 'Поле не должно быть пустым',
                bail: true
            },
            isLength: {
                options: { max: 100 },
                errorMessage: 'Адрес электронной почты не должен превышать 100 символов',
            },
            isEmail: {
                errorMessage: 'Адрес электронной почты не корректный',
            }
        },
        password: {
            exists: {
                errorMessage: 'Поле должно быть заполнено',
                bail: true
            },
            isLength: {
                options: { min: 5, max: 8 },
                errorMessage: 'Пароль должен быть не меньше 5 и не больше 8 символов',
            }
        },
    });

    await schemaObject.run(req);

    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    return res.status(400).json({ errors: errors.array() });
}

/**
 * @swagger
 * components:
 *   schemas:
 *     forgotRequest:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           maxLength: 100
 *           description: Адрес почты
 *       example:
 *         email: "example@mail.com"
 */
exports.forgotpassword = async (req, res, next) => {

    const schemaObject = checkSchema({
        email: {
            exists: {
                errorMessage: 'Отсутствует параметр',
                bail: true
            },
            trim: true,
            toLowerCase: true,
            notEmpty: {
                errorMessage: 'Поле не должно быть пустым',
                bail: true
            },
            isLength: {
                options: { max: 100 },
                errorMessage: 'Адрес электронной почты не должен превышать 100 символов',
            },
            isEmail: {
                errorMessage: 'Адрес электронной почты не корректный',
            }
        },
    });

    await schemaObject.run(req);

    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    return res.status(400).json({ errors: errors.array() });
}

/**
 * @swagger
 * components:
 *   schemas:
 *     changePasswordRequest:
 *       type: object
 *       required:
 *         - password
 *       properties:
 *         password:
 *           type: string
 *           minLength: 3
 *           maxLength: 8
 *           description: Пароль пользователя
 *       example:
 *         password: "12345"
 */
exports.changepassword = async (req, res, next) => {

    const schemaObject = checkSchema({
        password: {
            exists: {
                errorMessage: 'Поле должно быть заполнено',
                bail: true
            },
            isLength: {
                options: { min: 5, max: 8 },
                errorMessage: 'Пароль должен быть не меньше 5 и не больше 8 символов',
            }
        },
    });

    await schemaObject.run(req);

    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    return res.status(400).json({ errors: errors.array() });
}

/**
 * @swagger
 * components:
 *   schemas:
 *     updateRequest:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           maxLength: 30
 *           description: Имя пользователя
 *         lastName:
 *           type: string
 *           maxLength: 30
 *           description: Фамилия пользователя
 *         oldPassword:
 *           type: string
 *           minLength: 3
 *           maxLength: 8
 *           description: Старый Пароль пользователя
 *         newPassword:
 *           type: string
 *           minLength: 3
 *           maxLength: 8
 *           description: Новый Пароль пользователя
 *         phone:
 *           type: string
 *           minLength: 10
 *           maxLength: 15
 *           description: Телефон должен быть +xxxxxxxxxxxx
 *         description:
 *           type: string
 *           maxLength: 255
 *           description: Описание пользователя
 *         latitude:
 *           type: number
 *           min: -90
 *           max: 90
 *           description: Должен быть в пределах -90.00000:90.00000
 *         longitude:
 *           type: number
 *           min: -180
 *           max: 180
 *           description: Должен быть в пределах -180.00000:180.00000
 *         commercial:
 *           type: boolean
 *           description: Флаг коммерческой учетной записи Должен быть true или false
 *       example:
 *         firstName: "Jone"
 *         lastName: "Dou"
 *         oldPassword: "11111"
 *         newPassword: "12345"
 *         phone: "+380674567843"
 *         description: "Блда Бла Бла "
 *         latitude: "12.56765"
 *         longitude: "12.56765"
 *         commercial: "true"
 */
exports.update = async (req, res, next) => {

    const schemaObject = checkSchema({
        firstName: {
            optional: {
                options: {
                    // values: 'undefined' | 'null' | 'falsy'
                    values: 'undefined'
                }
            },
            trim: true,
            escape: true,
            notEmpty: {
                errorMessage: 'Поле не должно быть пустым',
                bail: true
            },
            isLength: {
                options: { max: 30 },
                errorMessage: 'Имя не должно быть больше 30 символов',
            }

        },
        lastName: {
            optional: {
                options: {
                    // values: 'undefined' | 'null' | 'falsy'
                    values: 'undefined'
                }
            },
            trim: true,
            escape: true,
            notEmpty: {
                errorMessage: 'Поле не должно быть пустым',
                bail: true
            },
            isLength: {
                options: { max: 30 },
                errorMessage: 'Имя не должно быть больше 30 символов',
            }
        },
        oldPassword: {
            isLength: {
                if: (value, { req }) => value !== undefined || req.body.newPassword !== undefined,
                options: { min: 5, max: 8 },
                errorMessage: 'Пароль должен быть не меньше 5 и не больше 8 символов',
            },
            exists: {
                if: (value, { req }) => req.body.newPassword !== undefined,
                errorMessage: 'Поле должно быть заполнено',
            },
        },
        newPassword: {
            isLength: {
                if: (value, { req }) => value !== undefined || req.body.oldPassword !== undefined,
                options: { min: 5, max: 8 },
                errorMessage: 'Пароль должен быть не меньше 5 и не больше 8 символов',
            },
            exists: {
                if: (value, { req }) => req.body.oldPassword !== undefined,
                errorMessage: 'Поле должно быть заполнено',
            },

        },
        phone: {
            optional: {
                options: {
                    // values: 'undefined' | 'null' | 'falsy'
                    values: 'null'
                }
            },
            matches: {
                options: /^\+\d{10,15}$/,
                errorMessage: 'Номер телефона должен быть от 10 до 15 символов и соответствовать +xxxxxxxxxxxx',
            },
        },
        description: {
            optional: {
                options: {
                    // values: 'undefined' | 'null' | 'falsy'
                    values: 'null'
                }
            },
            isLength: {
                options: { max: 255 },
                errorMessage: 'Описание не должно превышать 255 символов',
            },
        },
        latitude: {
            optional: {
                options: {
                    // values: 'undefined' | 'null' | 'falsy'
                    values: 'null'
                }
            },
            isFloat: {
                options: { min: -90.00000, max: 90.00000 },
                errorMessage: 'Широта должна быть числом в пределах -90.00000 до 90.00000',
            },
        },
        longitude: {
            optional: {
                options: {
                    // values: 'undefined' | 'null' | 'falsy'
                    values: 'null'
                }
            },
            isFloat: {
                options: { min: -180.00000, max: 180.00000 },
                errorMessage: 'Долгота должна быть числом в пределах -180.00000 до 180.00000',
            },
        },
        commercial: {
            optional: {
                options: {
                    // values: 'undefined' | 'null' | 'falsy'
                    values: 'undefined'
                }
            },
            isBoolean: {
                errorMessage: 'Поле должно быть boolean',
            }
        }
    });

    await schemaObject.run(req);

    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    return res.status(400).json({ errors: errors.array() });
}


exports.post = async (req, res, next) => {
    const schemaObject = checkSchema({
        description: {
            optional: {
                options: {
                    // values: 'undefined' | 'null' | 'falsy'
                    values: 'null'
                }
            },
            isLength: {
                options: { max: 255 },
                errorMessage: 'Описание не должно превышать 255 символов',
            },
        },
    });

    await schemaObject.run(req);

    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    return res.status(400).json({ errors: errors.array() });
}