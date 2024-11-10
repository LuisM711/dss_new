const { Model, DataTypes } = require('sequelize');
const ProyectoModel = require('./ProyectoModel.js');
const CategoriaModel = require('./CategoriaModel.js');
const sequelize = require('../database.js');

class CriterioModel extends Model { }

CriterioModel.init({
    idCriterio: {
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
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    peso: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'CriterioModel',
    tableName: 'tb_Criterios',
    timestamps: false
});
CriterioModel.belongsTo(CategoriaModel, { foreignKey: 'idCategoria' });
CriterioModel.belongsTo(ProyectoModel, { foreignKey: 'idProyecto' });

module.exports = CriterioModel;