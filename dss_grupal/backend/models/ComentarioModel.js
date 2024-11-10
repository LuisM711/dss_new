const { Model, DataTypes, DATE } = require('sequelize');
const ProyectoModel = require('./ProyectoModel.js');
const AlternativaModel = require('./AlternativaModel.js');
const UsuarioModel = require('./UsuarioModel.js');
const CategoriaModel = require('./CategoriaModel.js');
const sequelize = require('../database.js');

class ComentarioModel extends Model { }

ComentarioModel.init({
    idComentario: {
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
    idCategoria: {
        type: DataTypes.INTEGER,
        references: {
            model: CategoriaModel,
            key: 'idCategoria'
        },
        allowNull: false,
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        references: {
            model: UsuarioModel,
            key: 'idUsuario'
        },
        allowNull: false
    },
    fecha: {
        type: DATE,
        allowNull: false
    },
    comentario: {
        type: DataTypes.STRING,
        allowNull: true
    },
    aprobado: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'ComentarioModel',
    tableName: 'tb_Comentarios',
    timestamps: false
});
ComentarioModel.belongsTo(ProyectoModel, { foreignKey: 'idProyecto' });
ComentarioModel.belongsTo(CategoriaModel, { foreignKey: 'idCategoria' });
ComentarioModel.belongsTo(UsuarioModel, { foreignKey: 'idUsuario' });

module.exports = ComentarioModel;