import { Hono } from "hono";
import { Jwt, create } from "njwt";
import { AccessKey, Usuario } from "../models";

const auth = new Hono();

// auth.get("/", async (c) => {
//   try {
//     const usuarios = await Usuario.findOne({

//     });
//     return c.json(usuarios, 200);
//   } catch (error) {
//     return (c.error = error);
//   }
// });

// auth.get("/:id", async (c) => {
//   try {
//     const { id } = c.req.param();
//     return c.json(await Usuario.findByPk(id));
//   } catch (error) {
//     return (c.error = error);
//   }
// });

auth.post("/", async (c) => {
  try {
    const data: Object = await c.req.json();

    const user_session = await Usuario.findOne({
      where: {
        correo: data["correo"],
      },
    });

    const validation = await AccessKey.findOne({
      where: {
        usuario_id: user_session["id"],
      },
    });

    const isValid = await validation["authenticate"](data["password"]);

    if (!isValid) {
      throw new Error("signin failed");
    }

    const token: Jwt = create(
      { correo: user_session["correo"], key: validation["password"] },
      process.env.SECRET_TOKEN
    );

    token.setExpiration("1h");

    console.log("token: ", token);

    return c.json({
      token: token.compact(),
    });
  } catch (error) {
    return (c.error = error);
  }
});

// auth.delete("/:id", async (c) => {
//   try {
//     const { id } = c.req.param();
//     await Usuario.update(
//       {
//         activo: 0,
//       },
//       {
//         where: {
//           id,
//         },
//       }
//     );
//     return c.json(
//       Usuario.findOne({
//         where: {
//           id,
//         },
//       })
//     );
//   } catch (error) {
//     return c.json({ mensaje: error }, 500);
//   }
// });

// auth.patch("/:id", async (c) => {
//   try {
//     const { id } = c.req.param();
//     const data = await c.req.json();

//     await Usuario.update(data, {
//       where: {
//         id: id,
//       },
//     });

//     return c.json(await Usuario.findOne({ where: { id } }));
//   } catch (error) {
//     return (c.error = error);
//   }
// });

export default auth;
