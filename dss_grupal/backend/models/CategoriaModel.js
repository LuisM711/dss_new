const { Model, Datatypes, DATE } = require('sequelize');
const sequelize = require('../database.js');

class CategoriaModel extends Model { }

CategoriaModel.init({
    idCategoria: {
        type: Datatypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nombre: {
        type: Datatypes.STRING,
        allowNull: false
    },
    idProyecto: {
        type: Datatypes.INTEGER,
        allowNull: false
    },
    estatus: {
        type: Datatypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'CategoriaModel',
    tableName: 'tb_Categorias',
    timestamps: false
});

module.exports = CategoriaModel;