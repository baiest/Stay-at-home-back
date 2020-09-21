'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Pacientes', {
            cedulaP: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Personas',
                    key: 'cedula',
                    as: 'cedulaP'
                }
            },
            edad: {
                type: Sequelize.INTEGER
            },
            direccion: {
                type: Sequelize.STRING
            },
            telefono: {
                type: Sequelize.STRING
            },
            doctor: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Personas',
                    key: 'cedula',
                    as: 'doctor'
                }
            },
            informeP: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Informes',
                    key: 'idInforme',
                    as: 'informeP'
                }
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
        await queryInterface.dropTable('Pacientes');
    }
};