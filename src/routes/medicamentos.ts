import { Router } from "express";
import { postMedicamento, getMedicamentos, updateMedicamento, deleteMedicamento, postMedicamentoAll } from "../controllers/medicamentos";

const router = Router();

router.post("/", postMedicamento);
router.get("/", getMedicamentos);
router.put("/:id_ganado/:nombre", updateMedicamento);
router.delete("/:id_ganado/:nombre", deleteMedicamento);
router.post("/all", postMedicamentoAll);

export { router };
