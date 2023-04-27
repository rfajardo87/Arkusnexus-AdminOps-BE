import { DataTypes, Model } from "sequelize";
import sequelize from "../sqlz/source";

class RolModulo extends Model {
  declare usuario_id: string;
  declare rol_id: string;
}

RolModulo.init(
  {
    modulo_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    rol_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  },
  {
    tableName: "rol_modulo",
    sequelize,
  }
);

export default RolModulo;
