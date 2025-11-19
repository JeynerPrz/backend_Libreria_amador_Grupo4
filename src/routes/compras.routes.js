import { Router } from "express";
import {
  obtenerCompras,
  obtenerCompra,
  registrarCompra,
  eliminarCompra,
  actualizarCompra,
  obtenerDetallesCompra
} from "../controllers/compras.controller.js";

const router = Router();

router.get("/", obtenerCompras);
router.get("/:id_compra", obtenerCompra);

router.get("/:id_compra/detalles", obtenerDetallesCompra);

router.post("/", registrarCompra);
router.put("/:id_compra", actualizarCompra);
router.delete("/:id_compra", eliminarCompra);

export default router;
