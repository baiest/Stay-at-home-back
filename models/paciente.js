'use strict';
const {
    Model
} = require('sequelize');
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
                foreignKey: 'cedulaP',
                onDelete: 'CASCADE'
            });

            this.belongsTo(models.Informe, {
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
        edad: DataTypes.INTEGER,
        direccion: DataTypes.STRING,
        telefono: DataTypes.STRING,
        doctor: DataTypes.INTEGER,
        informeP: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Paciente',
    });
    return Paciente;
};