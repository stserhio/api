'use strict';
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        let pass = bcrypt.hashSync("secret", 5)

        return await queryInterface.bulkInsert('Users', [
            {
                firstName: 'Сергей',
                lastName: 'Маковецкий',
                email: 'example1@example.com',
                password: pass,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: 'Александр',
                lastName: 'Македонский',
                email: 'example2@example.com',
                password: pass,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: 'Светлана',
                lastName: 'Стоцкая',
                email: 'example3@example.com',
                password: pass,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: 'Юрий',
                lastName: 'Долгорукий',
                email: 'example4@example.com',
                password: pass,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: 'Всеволод',
                lastName: 'Монастырский',
                email: 'example5@example.com',
                password: pass,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        return await queryInterface.bulkDelete('Users', null, {});
    }
};
