import { Router } from "express";
import {
  obtenerCompras,
  obtenerCompra,
  registrarCompra,
  eliminarCompra,
} from "../controllers/compras.controller.js"; // 👈 nombre corregido

const router = Router();

// ✅ Obtener todas las compras
router.get("/compras", obtenerCompras);

// ✅ Obtener una compra por ID
router.get("/compras/:id_compra", obtenerCompra);

// ✅ Registrar una nueva compra
router.post("/compras", registrarCompra);

// ✅ Eliminar una compra por ID
router.delete("/compras/:id_compra", eliminarCompra);

export default router;
