const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js');

class ProyectoModel extends Model {}
ProyectoModel.init({
    idProyecto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'ProyectoModel',
    tableName: 'tb_Proyectos',
    timestamps: false
});

module.exports = ProyectoModel;