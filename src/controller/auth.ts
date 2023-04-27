import { Hono } from "hono";
import { Jwt, create } from "njwt";
import { AccessKey, Usuario, UsuarioRol } from "../models";
import { quickException } from "../shared/exception";

const auth = new Hono();

auth.post("/", async (c) => {
  try {
    const data: Object = await c.req.json();

    const user_session = await Usuario.findOne({
      where: {
        correo: data["correo"],
      },
      include: AccessKey,
    });

    const isAuth = await user_session["AccessKey"]["authenticate"](
      data["password"]
    );

    if (!isAuth) {
      throw new Error("signin failed");
    }

    const token: Jwt = create(
      {
        correo: user_session["correo"],
        key: user_session["AccessKey"]["password"],
      },
      process.env.SECRET_TOKEN
    );

    token.setExpiration("1h");

    return c.json({
      isAuth,
      token: token.compact(),
      info: JSON.stringify({ id: user_session["id"] }),
    });
  } catch (error) {
    return quickException(c, error);
  }
});

export default auth;
