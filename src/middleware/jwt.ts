import { Hono } from "hono";
import { jwt } from "hono/jwt";
import v1 from "./v1";

const authJwt = new Hono();

authJwt.use(
  "/v1/*",
  jwt({
    secret: process.env.SECRET_TOKEN,
  })
);

authJwt.route("/v1", v1);

export default authJwt;
