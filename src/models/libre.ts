import { DataTypes, Model } from "sequelize";
import sequelize from "../sqlz/source";

class Libre extends Model {
  declare nombre: string;
  declare correo: string;
  declare activo: boolean;
}

Libre.init(
  {
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    modelName: "Libres",
    tableName: "Libres",
    sequelize,
  }
);

export default Libre;
