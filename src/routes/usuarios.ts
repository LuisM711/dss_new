import { Router } from "express";
import { postUsuario, getUsuarios, updateUsuario, deleteUsuario, iniciarSesion, cambiarContra, recuperarContra } from "../controllers/usuarios";

const router = Router();

router.post("/", postUsuario);
router.get("/", getUsuarios);
router.put("/:correo", updateUsuario);
router.delete("/:correo", deleteUsuario);
router.post("/iniciarSesion", iniciarSesion);
router.post("/cambiarContra", cambiarContra);
router.post("/recuperarContra", recuperarContra);

export { router };
