import { DataTypes, DateOnlyDataType, Model } from "sequelize";
import { sequelize } from "../config/database";
import { Ganado } from "./ganado.model";

interface VentasAttributes {
    id_ganado: number;
    precio_venta: number;
    fecha:Date;
    id:number;
}

class Ventas extends Model<VentasAttributes> implements VentasAttributes {
    public id_ganado!: number;
    public precio_venta!: number;
    public fecha!: Date;
    public id!:number;
}

Ventas.init({
    id_ganado: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            model: Ganado,
            key: 'id'
        },
        onDelete: 'SET NULL'
    },
    precio_venta: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },fecha:{
        type: DataTypes.DATE
    },
    id:{
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'ventas',
    timestamps: false
});

export { Ventas };
