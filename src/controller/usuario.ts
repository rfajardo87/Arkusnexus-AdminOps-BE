import { Hono } from "hono";
import { AccessKey, Usuario } from "../models";

const usuario = new Hono();

usuario.get("/", async c => {
    try {
        const usuarios = await Usuario.findAll();
        return c.json(usuarios, 200);
    } catch (error) {
        return c.error = error;
    }
});

usuario.get("/:id", async c => {
    try {
        const { id } = c.req.param();
        return c.json(await Usuario.findByPk(id));
    } catch (error) {
        return c.error = error;
    }
});

usuario.post("/", async c => {
    try {
        const data: Object = await c.req.json();

        const nuevo = await Usuario.create({ ...data });
        await AccessKey.create({ ...data, usuario_id: nuevo["id"] })

        return c.json(nuevo);
    } catch (error) {
        return c.error = error;
    }
});

usuario.delete("/:id", async c => {
    try {
        const { id } = c.req.param();
        await Usuario.update({
            activo: 0
        }, {
            where: {
                id
            }
        });
        return c.json(Usuario.findOne({
            where: {
                id
            }
        }));
    } catch (error) {
        return c.json({ mensaje: error }, 500);
    }
});

usuario.patch("/:id", async c => {
    try {
        const { id } = c.req.param();
        const data = await c.req.json();

        await Usuario.update(data, {
            where: {
                id: id
            }
        });

        return c.json(await Usuario.findOne({ where: { id } }));
    } catch (error) {
        return c.error = error;
    }
});

export default usuario;