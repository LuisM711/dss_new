const { Model, DataTypes } = require('sequelize');
const ProyectoModel = require('./ProyectoModel.js');
const sequelize = require('../database.js');

class CategoriaModel extends Model { }

CategoriaModel.init({
    idCategoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idProyecto: {
        type: DataTypes.INTEGER,
        references: {
            model: ProyectoModel,
            key: 'idProyecto'
        },
        allowNull: false
    },
    // estatus: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
}, {
    sequelize,
    modelName: 'CategoriaModel',
    tableName: 'tb_Categorias',
    timestamps: false
});
CategoriaModel.belongsTo(ProyectoModel, { foreignKey: 'idProyecto' });
module.exports = CategoriaModel;