const { Model, DataTypes } = require('sequelize');
const ProyectoModel = require('./ProyectoModel.js');
const AlternativaModel = require('./AlternativaModel.js');
const sequelize = require('../database.js');

class ScoreModel extends Model { }

ScoreModel.init({
    idScore: {
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
    idAlternativa: {
        type: DataTypes.INTEGER,
        references: {
            model: AlternativaModel,
            key: 'idAlternativa'
        },
        allowNull: false,
    },
    score: {
        type: DataTypes.FLOAT,
        allowNull: false
    }

}, {
    sequelize,
    modelName: 'ScoreModel',
    tableName: 'tb_Scores',
    timestamps: false
});
ScoreModel.belongsTo(ProyectoModel, { foreignKey: 'idProyecto' });
ScoreModel.belongsTo(AlternativaModel, { foreignKey: 'idAlternativa' });

module.exports = ScoreModel;