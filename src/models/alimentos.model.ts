import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { Ganado } from "./ganado.model";

interface AlimentosAttributes {
    id_ganado: number;
    nombre_alimento: string;
    coste: number;
    fecha:Date;
    id:number;  
}

class Alimentos extends Model<AlimentosAttributes> implements AlimentosAttributes {
    public id_ganado!: number;
    public nombre_alimento!: string;
    public coste!: number;
    public fecha!: Date;
    public id!: number;
}

Alimentos.init({
    id_ganado: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            model: Ganado,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    nombre_alimento: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    coste: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },fecha:{
        type: DataTypes.DATE
    },
    id:{
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    }
}, {
    sequelize,
    tableName: 'alimentos',
    timestamps: false
});

export { Alimentos };
