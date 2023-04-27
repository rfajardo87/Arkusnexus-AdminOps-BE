import Usuario from "./usuario";
import Libre from "./libre";
import Responsable from "./responsable";
import Cliente from "./cliente";
import AccessKey from "./access_key";
import Cuenta from "./cuenta";
import Equipo from "./equipo";
import Rol from "./rol";
import Modulo from "./modulo";
import UsuarioRol from "./usuario_rol";
import RolModulo from "./rol_modulo";

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

Rol.hasMany(UsuarioRol, { foreignKey: "usuario_id" });
Usuario.hasMany(UsuarioRol, { foreignKey: "usuario_id" });
UsuarioRol.belongsTo(Rol, { foreignKey: "rol_id" });
UsuarioRol.belongsTo(Usuario, { foreignKey: "usuario_id" });

Rol.hasMany(RolModulo, { foreignKey: "rol_id" });
Modulo.hasMany(RolModulo, { foreignKey: "modulo_id" });
RolModulo.belongsTo(Rol, { foreignKey: "rol_id" });
RolModulo.belongsTo(Modulo, { foreignKey: "modulo_id" });

export {
  AccessKey,
  Cuenta,
  Equipo,
  Rol,
  Modulo,
  UsuarioRol,
  Usuario,
  Responsable,
  Cliente,
  Libre,
  RolModulo,
};
