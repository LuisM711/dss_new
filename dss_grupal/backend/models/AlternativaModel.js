const { Model, Datatypes } = require('sequelize');
const sequelize = require('../database.js');

class AlternativaModel extends Model { }

AlternativaModel.init({
    idAlternativa: {
        type: Datatypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    idProyecto: {
        type: Datatypes.INTEGER,
        allowNull: false
    },
    alternativa: {
        type: Datatypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'AlternativaModel',
    tableName: 'tb_Alternativas',
    timestamps: false
});

module.exports = AlternativaModel;