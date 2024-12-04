import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface UsuariosAttributes {
    correo: string;
    contraseña: string;
    nombre: string;
    permisos: string[];
}

interface UsuariosCreationAttributes extends Optional<UsuariosAttributes, 'correo'> {}

class Usuarios extends Model<UsuariosAttributes, UsuariosCreationAttributes> implements UsuariosAttributes {
    public correo!: string;
    public contraseña!: string;
    public nombre!: string;
    public permisos!: string[];
}

Usuarios.init({
    correo: {
        type: DataTypes.STRING(255),
        primaryKey: true
    },
    contraseña: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    permisos: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'usuarios',
    timestamps: false
});

export { Usuarios };
