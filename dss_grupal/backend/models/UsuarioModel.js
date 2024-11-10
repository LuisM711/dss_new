const { Model, DataTypes } = require('sequelize');
const GrupoModel = require('./GrupoModel.js');
const sequelize = require('../database.js');

class UsuarioModel extends Model { }
UsuarioModel.init({
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    idGrupo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: GrupoModel,
            key: 'idGrupo'
        },
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'UsuarioModel',
    tableName: 'tb_Usuarios',
    timestamps: false
});

UsuarioModel.belongsTo(GrupoModel, { foreignKey: 'idGrupo' });

module.exports = UsuarioModel;