import { DataTypes, Model } from "sequelize";
import sequelize from "../sqlz/source";

class Equipo extends Model {
    declare usuario_id: number;
    declare cuenta_id: number;
    declare activo: boolean;
}

Equipo.init({
    usuario_id: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    cuenta_id: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    activo: DataTypes.BOOLEAN
}, {
    tableName: "Equipo",
    sequelize
});

export default Equipo;
