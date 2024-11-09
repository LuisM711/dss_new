const { Model, DataTypes, DATE } = require('sequelize');
const GrupoModel = require('./GrupoModel.js');
const sequelize = require('../database.js');

class UsuarioModel extends Model { }
UsuarioModel.init({
    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idGrupo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: GrupoModel,
            key: 'idGrupo'
        }
    }
}, {
    sequelize,
    modelName: 'UsuarioModel',
    tableName: 'tb_Usuarios',
    timestamps: false
});

UsuarioModel.belongsTo(GrupoModel, { foreignKey: 'idGrupo' });

module.exports = UsuarioModel;