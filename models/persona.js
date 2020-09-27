'use strict';
const {
    Model
} = require('sequelize');
const paciente = require('./paciente');
module.exports = (sequelize, DataTypes) => {
    class Persona extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Persona.init({
        cedula: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        nombres: DataTypes.STRING,
        apellidos: DataTypes.STRING,
        email: DataTypes.STRING,
        pass: DataTypes.STRING,
        tipo: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Persona',
    });
    return Persona;
};