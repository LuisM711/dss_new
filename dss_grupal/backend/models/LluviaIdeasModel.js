const { Model, Datatypes, DATE } = require('sequelize');
const sequelize = require('../database.js');

class LluviaIdeasModel extends Model { }
LluviaIdeasModel.init({
    idLluviaIdeas: {
        type: Datatypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    idProyecto: {
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
    idea: {
        type: Datatypes.STRING,
        allowNull: false
    }

}, {
    sequelize,
    modelName: 'LluviaIdeasModel',
    tableName: 'tb_LluviaIdeas',
    timestamps: false
});

module.exports = LluviaIdeasModel;

