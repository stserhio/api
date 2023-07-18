'use strict';
const { Model } = require('sequelize');
const BlackList = require('./blacklist');
const Profile = require('./profile');
/**
 * @swagger
 * components:
 *   schemas:
 *     userModel:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Id пользователя
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
 *         token:
 *           type: string
 *           maxLength: 512
 *           description: Токен доступа
 *         avatar:
 *           type: string
 *           maxLength: 255
 *           description: URL аватарки пользователя
 *         status:
 *           type: boolean
 *           description: Статус записи пользователя
 *         createdAt:
 *           type: string
 *           description: Дата создания записи
 *         updatedAt:
 *           type: string
 *           description: Дата изменеия записи
 *       example:
 *         id: 56
 *         firstName: "Jone"
 *         lastName: "Dou"
 *         email: "example@mail.com"
 *         password: "12345"
 *         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJwb2to"
 *         avatar: "https://example.com/image.jpg"
 *         status: true
 *         updatedAt: "2023-06-18T16:22:32.561Z"
 *         createdAt: "2023-06-18T16:22:32.422Z"
 */
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    User.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        firstName: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING(512),
        },
        avatar: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        sequelize,
        modelName: 'User',
        timestamps: true,
        associate: (models) => {
            User.hasMany(models.BlackList, { foreignKey: 'userId'});
            User.hasOne(models.Profile, { foreignKey: 'userId'});
        }
    });

    return User;
};
