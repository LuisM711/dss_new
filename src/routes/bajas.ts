import { Router } from "express";
import { postBaja, getBajas, updateBaja, deleteBaja, BajaBecerro } from "../controllers/bajas";

const router = Router();

router.post("/", postBaja);
router.get("/", getBajas);
router.put("/:id_ganado", updateBaja);
router.delete("/:id_ganado", deleteBaja);
router.post("/becerro", BajaBecerro);

export { router };
