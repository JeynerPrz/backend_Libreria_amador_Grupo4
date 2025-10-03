import { Router } from "express";
import {
  obtenerCompras,
  obtenerCompra,
  registrarCompra,
  eliminarCompra,
  actualizarCompra,
} from "../controllers/compras.controller.js";

const router = Router();

// Obtener todas las compras
router.get("/compras", obtenerCompras);

// Obtener una compra por ID
router.get("/compras/:id_compra", obtenerCompra);

// Registrar una nueva compra
router.post("/compras", registrarCompra);

// Eliminar una compra por ID
router.delete("/compras/:id_compra", eliminarCompra);

// Actualizar una compra por ID
router.patch("/compras/:id_compra", actualizarCompra);

export default router;
