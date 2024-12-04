import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface GanadoAttributes {
    id: number; 
    peso_registro: number;
    fecha_nacimiento: Date;
    precio_adquisicion: number;
    fecha_adquisicion:Date;
}
interface GanadoCreationAttributes extends Optional<GanadoAttributes, 'id'> {}
class Ganado extends Model<GanadoAttributes, GanadoCreationAttributes> implements GanadoAttributes {
    public id!: number;
    public peso_registro!: number;
    public fecha_nacimiento!: Date;
    public precio_adquisicion!: number;
    public fecha_adquisicion!: Date;
}
interface RazaAttributes{
    id:number;
    nombre:string;
}
interface RazaCreationAttributes extends Optional<RazaAttributes, 'id'> {}
class Raza extends Model<RazaAttributes, RazaCreationAttributes> implements RazaAttributes {
    public id!: number;
    public nombre!: string;
}
interface PadresAttributes{
    id:number;
    id_padre:number;
    id_madre:number;
}
interface PadresCreationAttributes extends Optional<PadresAttributes, 'id'> {}
class Padres extends Model<PadresAttributes, PadresCreationAttributes> implements PadresAttributes {
    public id!: number;
    public id_padre!: number;
    public id_madre!: number;
}



Ganado.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true
    },
    peso_registro: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    precio_adquisicion: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },fecha_adquisicion:{
        type: DataTypes.DATE
    }
}, {
    sequelize,
    tableName: 'ganado',
    timestamps: false
});
Raza.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'raza',
    timestamps: false
}); 
Padres.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true
    },
    id_padre: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    id_madre: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'padres',
    timestamps: false
});
export { Ganado, Raza, Padres };