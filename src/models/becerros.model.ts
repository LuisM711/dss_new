import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

interface BecerrosAttributes {
    id:number;
}

class Becerros extends Model<BecerrosAttributes> implements BecerrosAttributes {
    public id!:number;
}

Becerros.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
}, {
    sequelize,
    tableName: 'becerros',
    timestamps: false
});

export { Becerros };
