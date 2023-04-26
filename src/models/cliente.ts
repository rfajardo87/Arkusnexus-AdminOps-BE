import { DataTypes } from "sequelize";
import sequelize from "../sqlz/source";
import Usuario from "./usuario";

class Cliente extends Usuario {
  declare nombre: string;
  declare correo: string;
  declare activo: boolean;
}

Cliente.init(
  {
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "Cliente",
    modelName: "Cliente",
    sequelize,
  }
);

export default Cliente;
