import { Hono } from "hono";
import { Cuenta, Responsable, Cliente } from "../models";

const cuenta = new Hono();

cuenta.get("/", async (c) => {
  try {
    const cuentas = await Cuenta.findAll({
      include: [Responsable, Cliente],
    });

    return c.json(cuentas);
  } catch (error) {
    return (c.error = error);
  }
});

cuenta.get("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const cuenta = await Cuenta.findByPk(id);
    return c.json(cuenta);
  } catch (error) {
    return (c.error = error);
  }
});

cuenta.post("/", async (c) => {
  try {
    const body: any = await c.req.json();
    const cuenta = await Cuenta.create(body);
    return c.json(cuenta);
  } catch (error) {
    return (c.error = error);
  }
});

cuenta.patch("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const data: typeof Cuenta = await c.req.json();

    await Cuenta.update(data, {
      where: {
        id: id,
      },
    });

    return c.json(await Cuenta.findByPk(id));
  } catch (error) {
    return (c.error = error);
  }
});

cuenta.delete("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    await Cuenta.update(
      {
        activo: false,
      },
      {
        where: { id },
      }
    );

    return c.json(Cuenta.findByPk(id));
  } catch (error) {
    return (c.error = error);
  }
});

export default cuenta;
