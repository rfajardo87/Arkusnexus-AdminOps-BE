import { Hono } from "hono";
import Auth from "./auth";
import usuario from "./usuario";
import Cuenta from "./cuenta";
import equipo from "./equipo";
import Rol from "./rol";

const v1 = new Hono();

v1.route("/auth", Auth);
v1.route("/usuario", usuario);
v1.route("/cuenta", Cuenta);
v1.route("/equipo", equipo);
v1.route("/rol", Rol);

export default v1;
