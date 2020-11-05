'use strict';
const {
    Model
} = require('sequelize');
const { Sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
    class Paciente extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Persona, {
                as: 'persona',
                foreignKey: 'cedulaP',
                onDelete: 'CASCADE'
            });

            this.belongsTo(models.Persona, {
                as: 'doctorP',
                foreignKey: 'doctor',
                onDelete: 'CASCADE'
            });
            this.belongsTo(models.Informe, {
                as: 'informe',
                foreignKey: 'informeP',
                onDelete: 'CASCADE'
            });

        }

    };
    Paciente.init({

        cedulaP: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        fecha_nacimiento: DataTypes.DATE,
        direccion: DataTypes.STRING,
        telefono: DataTypes.STRING,
        doctor: DataTypes.INTEGER,
        informeP: DataTypes.INTEGER,
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        sequelize,
        modelName: 'Paciente',
    });
    return Paciente;
};