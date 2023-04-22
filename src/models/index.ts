import Usuario from "./usuario";
import AccessKey from "./access_key";
import Cuenta from "./cuenta";
import Equipo from "./equipo";

Usuario.hasOne(AccessKey, { foreignKey: "usuario_id" });
AccessKey.belongsTo(Usuario, { foreignKey: "id" });

Cuenta.belongsTo(Usuario, { foreignKey: "cliente" });
Usuario.hasMany(Cuenta, { foreignKey: "id" });
Usuario.hasMany(Cuenta, { foreignKey: "id" });

Equipo.belongsTo(Usuario, { foreignKey: "usuario_id" });
Equipo.belongsTo(Cuenta, { foreignKey: "cuenta_id" });
Usuario.hasMany(Equipo, { foreignKey: "usuario_id" });
Cuenta.hasMany(Equipo, { foreignKey: "cuenta_id" });


export {
    AccessKey,
    Cuenta,
    Equipo,
    Usuario,
};