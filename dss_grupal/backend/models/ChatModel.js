const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js');

class ChatModel extends Model { }
ChatModel.init({
    idChat: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false
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
module.exports = ChatModel;