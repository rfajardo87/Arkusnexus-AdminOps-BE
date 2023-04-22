import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from 'hono/serve-static.bun';
import Usuario from "./controller/usuario";
import Cuenta from "./controller/cuenta";

const port = parseInt(`${process.env.PORT}`) || 3000;

const app = new Hono();

app.use('/favicon.ico', serveStatic({ path: './public/favicon.ico' }));

app.use("*",logger());
app.get("/", (c) => {
  return c.json({ message: "Hello World!" });
});

app.route("/usuario",Usuario);
app.route("/cuenta",Cuenta);

console.log(`Running at http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch
};
