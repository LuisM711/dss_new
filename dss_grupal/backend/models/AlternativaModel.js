const { Model, DataTypes } = require('sequelize');
const ProyectoModel = require('./ProyectoModel.js');
const sequelize = require('../database.js');

class AlternativaModel extends Model { }

AlternativaModel.init({
    idAlternativa: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    idProyecto: {
        type: DataTypes.INTEGER,
        references: {
            model: ProyectoModel,
            key: 'idProyecto'
        },
        allowNull: false
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    descripcion:{
        type:DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'AlternativaModel',
    tableName: 'tb_Alternativas',
    timestamps: false
});
AlternativaModel.belongsTo(ProyectoModel, {foreignKey: 'idProyecto'});


module.exports = AlternativaModel;