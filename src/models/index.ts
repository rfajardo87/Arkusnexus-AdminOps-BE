import Usuario from "./usuario";
import AccessKey from "./access_key";
import Cuenta from "./cuenta";
import Equipo from "./equipo";
import Rol from "./rol";
import UsuarioRol from "./usuario_rol";

Usuario.hasOne(AccessKey, { foreignKey: "usuario_id" });
AccessKey.belongsTo(Usuario, { foreignKey: "id" });

Cuenta.belongsTo(Usuario, { foreignKey: "cliente" });
Usuario.hasMany(Cuenta, { foreignKey: "id" });
Usuario.hasMany(Cuenta, { foreignKey: "id" });

Equipo.belongsTo(Usuario, { foreignKey: "usuario_id" });
Equipo.belongsTo(Cuenta, { foreignKey: "cuenta_id" });
Usuario.hasMany(Equipo, { foreignKey: "usuario_id" });
Cuenta.hasMany(Equipo, { foreignKey: "cuenta_id" });

Rol.hasMany(UsuarioRol, { foreignKey: "id" });
Usuario.hasMany(UsuarioRol, { foreignKey: "id" });
UsuarioRol.belongsTo(Rol, { foreignKey: "rol_id" });
UsuarioRol.belongsTo(Usuario, { foreignKey: "usuario_id" });


export {
    AccessKey,
    Cuenta,
    Equipo,
    Rol,
    UsuarioRol,
    Usuario,
};