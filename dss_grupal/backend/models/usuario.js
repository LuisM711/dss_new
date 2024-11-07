const {Model, Datatypes, DATE} = require('sequelize');
const sequelize = require('../database.js');

class usuario extends Model{}
usuario.init({
    idUser:{
        type: Datatypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nombre:{
        type: Datatypes.STRING,
        allowNull: false,
    },
    password:{
        type: Datatypes.STRING,
        allowNull: false
    },
    tipo:{
        
    }
}, {
        sequelize,
        modelName: 'usuario',
        tableName: 'tb_usuarios',
        timestamps: false
    });
module.exports = usuario;