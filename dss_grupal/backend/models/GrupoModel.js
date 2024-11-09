const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js');

class GrupoModel extends Model { }
GrupoModel.init({
    idGrupo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'GrupoModel',
    tableName: 'tb_Grupos',
    timestamps: false
});
module.exports = GrupoModel;