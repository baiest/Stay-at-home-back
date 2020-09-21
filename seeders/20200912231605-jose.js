'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Personas', [{
                cedula: 1,
                nombres: 'Jose',
                apellidos: 'Perez',
                email: 'correo@gmail.com',
                tipo: 'D',
                pass: '123',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                cedula: 2,
                nombres: 'Daniel',
                apellidos: 'Zuares',
                email: 'prueba@gmail.com',
                tipo: 'P',
                pass: '456',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ])

        await queryInterface.bulkInsert('Informes', [{
                idInforme: 1,
                texto: 'Informe de prueba',
                createdAt: new Date(),
                updatedAt: new Date()
            }

        ])

        await queryInterface.bulkInsert('Pacientes', [{
                cedulaP: 2,
                edad: 24,
                direccion: 'calle 23 # 45 - 758',
                telefono: '554',
                doctor: 1,
                informeP: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },

        ])
    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};