import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { Ganado } from "./ganado.model";

interface MedicamentosAttributes {
    id_ganado: number;
    nombre_medicamento: string;
    coste: number;    
    fecha:Date;
    id:number;
}

class Medicamentos extends Model<MedicamentosAttributes> implements MedicamentosAttributes {
    public id_ganado!: number;
    public nombre_medicamento!: string;
    public coste!: number;
    public fecha!: Date;
    public id!:number;
}

Medicamentos.init({
    id_ganado: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            model: Ganado,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    nombre_medicamento: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    coste: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },fecha:{
        type: DataTypes.DATE
    },id:{
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    }
}, {
    sequelize,
    tableName: 'medicamentos',
    timestamps: false
});

export { Medicamentos };
