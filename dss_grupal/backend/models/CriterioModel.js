const { Model, DataTypes } = require('sequelize');
const ProyectoModel = require('./ProyectoModel.js');
const CategoriaModel = require('./CategoriaModel.js');
const sequelize = require('../database.js');

class CriterioModel extends Model { }

CriterioModel.init({
    idCriterio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    idCategoria: {
        type: DataTypes.INTEGER,
        references: {
            model: CategoriaModel,
            key: 'idCategoria'
        }
    },
    idProyecto: {
        type: DataTypes.INTEGER,
        references: {
            model: ProyectoModel,
            key: 'idProyecto'
        }
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull: false
    },
    descripcion:{
        type:DataTypes.STRING,
        allowNull: false
    },
    peso:{
        type:DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'CriterioModel',
    tableName: 'tb_Criterios',
    timestamps: false
});
CriterioModel.belongsTo(CategoriaModel, {foreignKey: 'idCategoria'});
CriterioModel.belongsTo(ProyectoModel, {foreignKey: 'idProyecto'});

module.exports = CriterioModel;