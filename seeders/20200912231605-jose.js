'use strict';

var bcrypt = require('bcrypt');
var BCRYPT_SALT_ROUNDS = 12;

async function encriptar(pass) {
    var nuevaPass;
    await bcrypt.hash('123', BCRYPT_SALT_ROUNDS)
        .then(passHash => nuevaPass = passHash)
    return nuevaPass
}
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Personas', [{
                cedula: 1,
                nombres: 'Jose',
                apellidos: 'Perez',
                email: 'correo@gmail.com',
                tipo: 'D',
                pass: await encriptar('123'),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                cedula: 2,
                nombres: 'Daniel',
                apellidos: 'Zuares',
                email: 'prueba@gmail.com',
                tipo: 'P',
                pass: await encriptar('456'),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                cedula: 3,
                nombres: 'Juan',
                apellidos: 'Suarez',
                email: 'doctor@gmail.com',
                tipo: 'D',
                pass: await encriptar('123'),
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ])

        await queryInterface.bulkInsert('Informes', [{
                idInforme: 2,
                texto: 'Informe de prueba',
                createdAt: new Date(),
                updatedAt: new Date()
            }

        ])

        await queryInterface.bulkInsert('Pacientes', [{
                cedulaP: 2,
                fecha_nacimiento: '2000-05-11T00:00:00.000Z',
                direccion: 'calle 23 # 45 - 758',
                telefono: '554',
                doctor: 1,
                //informeP: 1,
                isActive: true,
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