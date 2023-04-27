import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { serveStatic } from "hono/serve-static.bun";

import Auth from "./controller/auth";

/**
 * Middleware
 */
import authJwt from "./middleware/jwt";
/**
 * documentation
 */
import swaggerUi from "./docs/docs";

const port = parseInt(`${process.env.PORT}`) || 3000;

const app = new Hono();

app.use("/favicon.ico", serveStatic({ path: "./public/favicon.ico" }));
// app.use("/docs",swaggerUi.serve);

app.use("*", logger());
app.use(
  "*",
  cors({
    origin: "http://localhost:3000",
    allowMethods: ["POST", "GET", "OPTIONS", "DELETE", "PATCH"],
  })
);

app.route("/auth", Auth);
app.route("/", authJwt);

console.log(`Running at http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
