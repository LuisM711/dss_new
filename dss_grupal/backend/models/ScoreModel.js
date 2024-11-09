const { Model, DataTypes, DATE } = require('sequelize');
const ProyectoModel = require('./ProyectoModel.js');
const AlternativaModel = require('./AlternativaModel.js');
const sequelize = require('../database.js');

class ScoreModel extends Model { }

ScoreModel.init({
    idScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    idProyecto: {
        type: DataTypes.INTEGER,
        references: {
            model: ProyectoModel,
            key: 'idProyecto'
        }
    },
    idAlternativa: {
        type: DataTypes.INTEGER,
        references: {
            model: AlternativaModel,
            key: 'idAlternativa'
        }
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