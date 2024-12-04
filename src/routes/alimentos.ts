import { Router } from "express";
import { postAlimento, getAlimentos, updateAlimento, deleteAlimento, postAlimentoAll } from "../controllers/alimentos";

const router = Router();

router.post("/", postAlimento);
router.get("/", getAlimentos);
router.put("/:id_ganado/:nombre", updateAlimento);
router.delete("/:id_ganado/:nombre", deleteAlimento);
router.post("/all", postAlimentoAll);

export { router };
