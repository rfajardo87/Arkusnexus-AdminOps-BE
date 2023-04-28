import { DataTypes, Model } from "sequelize";
import sequelize from "../sqlz/source";

class Modulo extends Model {
    declare id: string;
    declare nombre: string;
}

Modulo.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
    },
    nombre: DataTypes.STRING,
}, {
    tableName: "modulo",
    sequelize
});

export default Modulo;