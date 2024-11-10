const { Model, DataTypes, DATE } = require('sequelize');
const ProyectoModel = require('./ProyectoModel.js');
const UsuarioModel = require('./UsuarioModel.js');
const sequelize = require('../database.js');

class LluviaIdeasModel extends Model { }
LluviaIdeasModel.init({
    idLluviaIdeas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    idProyecto: {
        type: DataTypes.INTEGER,
        references: {
            model: ProyectoModel,
            key: 'idProyecto'
        },
        allowNull: false,
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
        type: DATE,
        allowNull: false
    },
    idea: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    sequelize,
    modelName: 'LluviaIdeasModel',
    tableName: 'tb_LluviaIdeas',
    timestamps: false
});
LluviaIdeasModel.belongsTo(ProyectoModel, { foreignKey: 'idProyecto' });
LluviaIdeasModel.belongsTo(UsuarioModel, { foreignKey: 'idUsuario' });
module.exports = LluviaIdeasModel;

