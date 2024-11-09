const { Model, DataTypes, DATE } = require('sequelize');
const ProyectoModel = require('./ProyectoModel.js');
const AlternativaModel = require('./AlternativaModel.js');
const CriterioModel = require('./CriterioModel.js');
const sequelize = require('../database.js');

class MatrizModel extends Model { }
MatrizModel.init({
    idMatriz: {
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
    idCriterio: {
        type: DataTypes.INTEGER,
        references: {
            model: CriterioModel,
            key: 'idCriterio'
        }
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: false
    }

}, {
    sequelize,
    modelName: 'MatrizModel',
    tableName: 'tb_Matriz',
    timestamps: false
});
MatrizModel.belongsTo(ProyectoModel, { foreignKey: 'idProyecto' });
MatrizModel.belongsTo(AlternativaModel, { foreignKey: 'idAlternativa' });
MatrizModel.belongsTo(CriterioModel, { foreignKey: 'idCriterio' });

module.exports = MatrizModel;