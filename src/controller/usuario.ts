import { Hono } from "hono";
import {
  AccessKey,
  Cliente,
  Libre,
  Responsable,
  Usuario,
  UsuarioRol,
} from "../models";
import source from "../sqlz/source";
import { quickException } from "../shared/exception";

const usuario = new Hono();

usuario.get("/", async (c) => {
  try {
    const usuarios = await Usuario.findAll({
      include: UsuarioRol,
    });
    return c.json(usuarios, 200);
  } catch (error) {
    return quickException(c, error);
  }
});

usuario.get("/responsable", async (c) => {
  try {
    const responsables = await Responsable.findAll();
    return c.json(responsables);
  } catch (error) {
    return quickException(c, error);
  }
});

usuario.get("/cliente", async (c) => {
  try {
    const clientes = await Cliente.findAll();
    return c.json(clientes);
  } catch (error) {
    return quickException(c, error);
  }
});

usuario.get("/libre", async (c) => {
  try {
    const libres = await Libre.findAll();
    return c.json(libres);
  } catch (error) {
    return quickException(c, error);
  }
});

usuario.get("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    return c.json(await Usuario.findByPk(id));
  } catch (error) {
    return quickException(c, error);
  }
});

usuario.get("/:id/roles", async (c) => {
  try {
    const { id } = c.req.param();
    const roles = await UsuarioRol.findAll({
      where: {
        usuario_id: id,
      },
    });

    return c.json(roles);
  } catch (error) {
    return quickException(c, error);
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
    return quickException(c, error);
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
    return quickException(c, error);
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
    return quickException(c, error);
  }
});

export default usuario;
