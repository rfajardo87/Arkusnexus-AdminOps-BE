import { DataTypes, Model } from "sequelize";
import sequelize from "../sqlz/source";

class UsuarioRol extends Model {
    declare usuario_id: string;
    declare rol_id: string;
    declare activo: boolean;
}

UsuarioRol.init({
    usuario_id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    rol_id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    tableName: "usuario_rol",
    sequelize
});

export default UsuarioRol;
