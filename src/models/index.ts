import Usuario from "./usuario";
import Libre from "./libre";
import Responsable from "./responsable";
import Cliente from "./cliente";
import AccessKey from "./access_key";
import Cuenta from "./cuenta";
import Equipo from "./equipo";
import Rol from "./rol";
import UsuarioRol from "./usuario_rol";

Usuario.hasOne(AccessKey, { foreignKey: "usuario_id" });
AccessKey.belongsTo(Usuario, { foreignKey: "usuario_id" });

Cuenta.belongsTo(Cliente, { foreignKey: "cliente" });
Cuenta.belongsTo(Responsable, { foreignKey: "responsable" });
Responsable.hasMany(Cuenta, { foreignKey: "id" });
Cliente.hasMany(Cuenta, { foreignKey: "id" });

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
  Responsable,
  Cliente,
  Libre
};
