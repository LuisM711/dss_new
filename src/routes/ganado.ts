import { Router } from "express";
import { postGanado, getGanado, updateGanado, deleteGanado, getRaza, getPadres, getInfo } from "../controllers/ganado";

const router = Router();

router.post("/", postGanado);
router.get("/", getGanado);
router.put("/:id", updateGanado);
router.delete("/:id", deleteGanado);
router.get("/raza", getRaza);
router.get("/padres", getPadres);
router.get("/:id", getInfo);
export { router };
