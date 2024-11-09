const { Model, DataTypes, DATE } = require('sequelize');
const ProyectoModel = require('./ProyectoModel.js');
const AlternativaModel = require('./AlternativaModel.js');
const UsuarioModel = require('./UsuarioModel.js');
const sequelize = require('../database.js');

class ComentarioModel extends Model { }

ComentarioModel.init({
    idComentario: {
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
    idUsuario: {
        type: DataTypes.INTEGER,
        references: {
            model: UsuarioModel,
            key: 'idUsuario'
        }
    },
    fecha: {
        type: DATE,
        allowNull: false
    },
    comentario: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'ComentarioModel',
    tableName: 'tb_Comentarios',
    timestamps: false
});
ComentarioModel.belongsTo(ProyectoModel, { foreignKey: 'idProyecto' });
ComentarioModel.belongsTo(AlternativaModel, { foreignKey: 'idAlternativa' });
ComentarioModel.belongsTo(UsuarioModel, { foreignKey: 'idUsuario' });

module.exports = ComentarioModel;