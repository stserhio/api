'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('BlackLists', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'Users',
                    },
                    key: 'id',
                },
                allowNull: false
            },
            timeLive: {
                allowNull: false,
                type: Sequelize.INTEGER
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
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('BlackLists');
    }
};