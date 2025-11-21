import { Router } from "express";
import {
  obtenerCompras,
  obtenerCompra,
  registrarCompra,
  eliminarCompra,
  actualizarCompra,
  obtenerDetallesCompra,
} from "../controllers/compras.controller.js";

const router = Router();

// Rutas RESTful para Compras
router.get("/", obtenerCompras);                 // GET /api/compras
router.get("/:id", obtenerCompra);               // GET /api/compras/:id
router.get("/:id/detalles", obtenerDetallesCompra); // GET /api/compras/:id/detalles
router.post("/", registrarCompra);               // POST /api/compras
router.put("/:id", actualizarCompra);            // PUT /api/compras/:id
router.delete("/:id", eliminarCompra);           // DELETE /api/compras/:id

export default router;
