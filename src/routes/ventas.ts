import { Router } from "express";
import { postVenta, getVentas, updateVenta, deleteVenta } from "../controllers/ventas";

const router = Router();

router.post("/", postVenta);
router.get("/", getVentas);
router.put("/:id_ganado", updateVenta);
router.delete("/:id_ganado", deleteVenta);

export { router };
