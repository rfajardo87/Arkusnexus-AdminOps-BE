import { DataTypes, ForeignKey, Model } from "sequelize";
import sequelize from "../sqlz/source";

export class Cuenta extends Model {
    declare nombre: string;
    declare cliente: ForeignKey<number>;
    declare responsable: ForeignKey<number>;
    declare activo: boolean;
}

Cuenta.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        field: "id"
    },
    nombre: DataTypes.STRING,
    cliente: DataTypes.BIGINT,
    responsable: DataTypes.BIGINT,
    activo: DataTypes.BOOLEAN,
}, {
    sequelize,
    tableName: "Cuenta"
});

export default Cuenta;
