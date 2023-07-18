'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            firstName: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            lastName: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING(100),
                unique: true,
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            token: {
                type: Sequelize.STRING(512),
            },
            avatar: {
                type: Sequelize.STRING,
            },
            status: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('Users');
    }
};