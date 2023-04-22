import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../sqlz/source";

class Usuario extends Model{
    declare nombre: string;
    declare correo: string;
    declare activo: boolean;
}

Usuario.init({
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    tableName: "Usuario",
    sequelize
});

export default Usuario;
