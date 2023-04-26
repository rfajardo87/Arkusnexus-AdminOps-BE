import { Hono } from "hono";
import { Rol } from "../models";

const rol = new Hono();

rol.get("/", async (c) => {
  try {
    const usuarios = await Rol.findAll({
      attributes: ["id", ["descripcion", "Rol"], "activo"],
    });
    return c.json(usuarios, 200);
  } catch (error) {
    return (c.error = error);
  }
});

rol.get("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    return c.json(await Rol.findByPk(id));
  } catch (error) {
    return (c.error = error);
  }
});

rol.post("/", async (c) => {
  try {
    const data: Object = await c.req.json();

    const nuevo = await Rol.create({ ...data });

    return c.json(nuevo);
  } catch (error) {
    return (c.error = error);
  }
});

rol.delete("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    await Rol.update(
      {
        activo: 0,
      },
      {
        where: {
          id,
        },
      }
    );
    return c.json(
      Rol.findOne({
        where: {
          id,
        },
      })
    );
  } catch (error) {
    return c.json({ mensaje: error }, 500);
  }
});

rol.patch("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const data = await c.req.json();

    await Rol.update(data, {
      where: {
        id: id,
      },
    });

    return c.json(await Rol.findOne({ where: { id } }));
  } catch (error) {
    return (c.error = error);
  }
});

export default rol;
