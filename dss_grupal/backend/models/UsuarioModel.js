const { Model, Datatypes, DATE } = require('sequelize');
const sequelize = require('../database.js');

class UsuarioModel extends Model { }
UsuarioModel.init({
    idUser: {
        type: Datatypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nombre: {
        type: Datatypes.STRING,
        allowNull: false,
    },
    password: {
        type: Datatypes.STRING,
        allowNull: false
    },
    tipo: {

    }
}, {
    sequelize,
    modelName: 'UsuarioModel',
    tableName: 'tb_Usuarios',
    timestamps: false
});
module.exports = UsuarioModel;