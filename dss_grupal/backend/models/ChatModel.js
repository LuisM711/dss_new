const { Model, DataTypes } = require('sequelize');
const UsuarioModel = require('./UsuarioModel.js');
const sequelize = require('../database.js');

class ChatModel extends Model { }
ChatModel.init({
    idChat: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        references: {
            model: UsuarioModel,
            key: 'idUsuario'
        },
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },
    mensaje: {
        type: DataTypes.STRING,
        allowNull: false
    }
    
}, {
    sequelize,
    modelName: 'ChatModel',
    tableName: 'tb_Chats',
    timestamps: false
});
ChatModel.belongsTo(UsuarioModel, {foreignKey: 'idUsuario'});
module.exports = ChatModel;