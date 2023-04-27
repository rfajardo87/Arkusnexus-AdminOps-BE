import { Hono } from "hono";
import usuario from "../controller/usuario";
import Cuenta from "../controller/cuenta";
import equipo from "../controller/equipo";
import Rol from "../controller/rol";

const v1 = new Hono();

v1.route("/usuario", usuario);
v1.route("/cuenta", Cuenta);
v1.route("/equipo", equipo);
v1.route("/rol", Rol);

export default v1;
