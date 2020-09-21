'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Personas', {
            cedula: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            nombres: {
                type: Sequelize.STRING
            },
            apellidos: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            tipo: {
                type: Sequelize.STRING
            },
            pass: {
                type: Sequelize.STRING
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
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Personas');
    }
};