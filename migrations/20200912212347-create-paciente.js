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
            fecha_nacimiento: {
                type: Sequelize.DATE
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
            /*
                        informeP: {
                            type: Sequelize.INTEGER,
                            onDelete: 'CASCADE',
                            references: {
                                model: 'Informes',
                                key: 'idInforme',
                                as: 'informeP'
                            }
                        },*/
            isActive: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
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