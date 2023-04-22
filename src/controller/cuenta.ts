import { Hono } from "hono";

const cuenta = new Hono();

cuenta
.get("/",c=>c.text("cuenta"));

export default cuenta;