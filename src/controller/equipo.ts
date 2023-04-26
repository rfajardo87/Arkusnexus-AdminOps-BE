import { Hono } from "hono";
import { Cuenta, Equipo, Usuario } from "../models";
import { quickException } from "../shared/exception";

const equipo = new Hono();

equipo.post("/:id/:userId", async (c) => {
  try {
    const { id: cuenta_id, userId: usuario_id } = c.req.param();

    await Equipo.upsert({ usuario_id, cuenta_id, activo: true });

    return c.json({ usuario_id, cuenta_id });
  } catch (error) {
    return quickException(c, error);
  }
});

equipo.get("/", async (c) => {
  try {
    return c.json(await Equipo.findAll());
  } catch (error) {
    return quickException(c, error);
  }
});

equipo.get("/:cuenta_id", async (c) => {
  try {
    const { cuenta_id } = c.req.param();

    const cuenta = await Cuenta.findByPk(cuenta_id);

    const current = await Equipo.findAll({
      where: {
        cuenta_id,
      },
      include: Usuario,
    });

    return c.json({ ...cuenta.dataValues, equipo: current });
  } catch (error) {
    return quickException(c, error);
  }
});

equipo.patch("/:cuenta_id/:usuario_id", async (c) => {
  try {
    const { cuenta_id, usuario_id } = c.req.param();
    await Equipo.update(
      {
        activo: true,
      },
      {
        where: {
          cuenta_id,
          usuario_id,
        },
      }
    );
    c.json({ mensaje: `${usuario_id} activado en la cuenta ${cuenta_id}` });
  } catch (error) {
    return quickException(c, error);
  }
});

equipo.delete("/:cuenta_id/:usuario_id", async (c) => {
  try {
    const { cuenta_id, usuario_id } = c.req.param();

    const existe = await Equipo.count({
      where: {
        cuenta_id,
        usuario_id,
      },
    });

    if (!existe) {
      throw new Error("No existe el registro en el equipo");
    }

    await Equipo.update(
      {
        activo: false,
      },
      {
        where: {
          cuenta_id,
          usuario_id,
        },
      }
    );

    return c.json({
      mensaje: `Usuario ${usuario_id} eliminado del equipo ${cuenta_id}`,
    });
  } catch (error) {
    return quickException(c, error);
  }
});

export default equipo;
