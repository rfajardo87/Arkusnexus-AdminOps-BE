import { Hono } from "hono";
import Usuario from "../models/usuario";

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
        const body: typeof Usuario = await c.req.json();
        console.log("nuevo:", body);
        const nuevo = Usuario.create(
            { ...body }
        );

        return c.json(nuevo, 200);
    } catch (error) {
        return c.error = error;
    }
});

usuario.delete("/:id", async c => {
    try {
        const { id } = c.req.param();
        await Usuario.update({
            activo: false
        }, {
            where: {
                id
            }
        });
        return c.json(Usuario.findByPk(id));
    } catch (error) {
        return c.json({ mensaje: error }, 500);
    }
});

usuario.patch("/:id", async c => {
    try {
        const { id } = c.req.param();
        const data: typeof Usuario = await c.req.json();

        const usuario = await Usuario.update(data, {
            where: {
                id: id
            }
        });

        return c.json(await Usuario.findByPk(id));
    } catch (error) {
        return c.error = error;
    }
});

export default usuario;