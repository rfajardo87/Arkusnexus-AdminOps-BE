import { Hono } from "hono";
import { Modulo, RolModulo } from "../models";
import { quickException } from "../shared/exception";

const rolModulo = new Hono();

rolModulo.get("/:roles", async (c) => {
  try {
    const { roles } = c.req.param();
    const access = await RolModulo.findAll({
      where: { rol_id: roles.split("") },
      group: ["modulo_id", "rol_id", "createdAt", "updatedAt"],
      include: Modulo,
    });
    const modulos: Object = {};
    access.forEach((acc) => {
      modulos[acc["Modulo"].id] = acc["Modulo"];
    });
    return c.json({ modulos: Object.values(modulos) });
  } catch (error) {
    return quickException(c, error);
  }
});

export default rolModulo;
