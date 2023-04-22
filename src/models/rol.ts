import { DataTypes, Model } from "sequelize";
import sequelize from "../sqlz/source";

class Rol extends Model {
    declare id: string;
    declare descripcion: string;
    declare activo: boolean;
}

Rol.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    descripcion: DataTypes.STRING,
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    tableName: "Rol",
    sequelize
});

export default Rol;
