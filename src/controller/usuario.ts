import { Hono } from "hono";
import {
  AccessKey,
  Cliente,
  Responsable,
  Usuario,
  UsuarioRol,
} from "../models";
import source from "../sqlz/source";

const usuario = new Hono();

usuario.get("/", async (c) => {
  try {
    const usuarios = await Usuario.findAll();
    return c.json(usuarios, 200);
  } catch (error) {
    return (c.error = error);
  }
});

usuario.get("/responsable", async (c) => {
  try {
    const responsables = await Responsable.findAll();
    return c.json(responsables);
  } catch (error) {
    return (c.error = error);
  }
});

usuario.get("/cliente", async (c) => {
  try {
    const clientes = await Cliente.findAll();
    return c.json(clientes);
  } catch (error) {
    return (c.error = error);
  }
});

usuario.get("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    return c.json(await Usuario.findByPk(id));
  } catch (error) {
    return (c.error = error);
  }
});

usuario.post("/", async (c) => {
  const trans = await source.transaction();
  try {
    const data: Object = await c.req.json();

    const nuevo = await Usuario.create({ ...data }, { transaction: trans });
    await AccessKey.create(
      { ...data, usuario_id: nuevo["id"] },
      { transaction: trans }
    );
    await UsuarioRol.create(
      { usuario_id: nuevo["id"], rol_id: data["rol"] },
      { transaction: trans }
    );

    await trans.commit();
    return c.json(nuevo);
  } catch (error) {
    await trans.rollback();
    c.error = error;
    c.status(500);
    return c.text(error);
  }
});

usuario.delete("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    await Usuario.update(
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
      Usuario.findOne({
        where: {
          id,
        },
      })
    );
  } catch (error) {
    return c.json({ mensaje: error }, 500);
  }
});

usuario.patch("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const data = await c.req.json();

    await Usuario.update(data, {
      where: {
        id: id,
      },
    });

    return c.json(await Usuario.findOne({ where: { id } }));
  } catch (error) {
    return (c.error = error);
  }
});

export default usuario;
