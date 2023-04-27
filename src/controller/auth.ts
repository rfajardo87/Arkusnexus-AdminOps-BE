import { Hono } from "hono";
import { Jwt, create } from "njwt";
import { AccessKey, Usuario } from "../models";
import { quickException } from "../shared/exception";

const auth = new Hono();

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

    return c.json({
      isAuth: isValid,
      token: token.compact(),
    });
  } catch (error) {
    return quickException(c, error);
  }
});

export default auth;
