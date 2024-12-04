import { Router } from "express";
import { postBecerro, getBecerros, deleteBecerro } from "../controllers/becerros";

const router = Router();

router.post("/", postBecerro);
router.get("/", getBecerros);
router.delete("/", deleteBecerro);

export { router };
