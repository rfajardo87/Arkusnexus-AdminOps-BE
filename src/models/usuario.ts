import { DataTypes } from "sequelize";
import source from "../sqlz/source";
import { modelo } from "./model";

const Usuario = source.define("Usuario", {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    activo: DataTypes.BOOLEAN,
    ...modelo
}, {
    tableName: "Usuario",
    hooks: {
        beforeCreate: async (usuario: typeof Usuario, options) => {
            usuario.id = await Usuario.count() + 1
        }
    }
});

export default Usuario;
