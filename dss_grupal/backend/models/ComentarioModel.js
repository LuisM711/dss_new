const { Model, Datatypes, DATE } = require('sequelize');
const sequelize = require('../database.js');

class ComentarioModel extends Model { }

ComentarioModel.init({
    idComentario: {
        type: Datatypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    idProyecto: {
        type: Datatypes.INTEGER,
        allowNull: false
    },
    idAlternativa: {
        type: Datatypes.INTEGER,
        allowNull: false
    },
    idUsuario: {
        type: Datatypes.INTEGER,
        allowNull: false
    },
    fecha: {
        type: DATE,
        allowNull: false
    },
    comentario: {
        type: Datatypes.STRING,
        allowNull: false
    }
    

}, {
    sequelize,
    modelName: 'ComentarioModel',
    tableName: 'tb_Comentarios',
    timestamps: false
});

module.exports = ComentarioModel;