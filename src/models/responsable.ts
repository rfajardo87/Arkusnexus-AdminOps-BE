import { DataTypes, Model } from "sequelize";
import sequelize from "../sqlz/source";

class Responsable extends Model {
    declare nombre: string;
    declare correo: string;
    declare activo: boolean;
}

Responsable.init({
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    modelName: "Responsable",
    tableName:"Responsable",
    sequelize
});

export default Responsable;
