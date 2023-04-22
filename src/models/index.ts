import Usuario from "./usuario";
import AccessKey from "./access_key";
import Cuenta from "./cuenta";

Usuario.hasOne(AccessKey, { foreignKey: "usuario_id" });
AccessKey.belongsTo(Usuario, { foreignKey: "id" });

Cuenta.belongsTo(Usuario, { foreignKey: "cliente" });
Usuario.hasMany(Cuenta, { foreignKey: "id" });
Usuario.hasMany(Cuenta, { foreignKey: "id" });


export {
    Usuario,
    AccessKey,
    Cuenta
};