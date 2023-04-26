import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { serveStatic } from "hono/serve-static.bun";

/**Controllers */
import v1 from "./controller/v1";

/**documentation */
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

app.use(
  "/api/*",
  jwt({
    secret: process.env.SECRET_TOKEN,
  })
);

app.route("/v1", v1);

console.log(`Running at http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
