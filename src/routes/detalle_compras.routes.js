import { Router } from 'express';
import {
  obtenerDetalle_Compras,
  obtenerDetallesCompraPorCompra,
  registrarDetalleCompra,
  actualizarDetalleCompra,
  eliminarDetalleCompra,
} from '../controllers/detalle_compras.controller.js';

const router = Router();

// Rutas RESTful para Detalle_Compras
router.get("/", obtenerDetalle_Compras);                   // GET /api/detalle_compras
router.get("/por_compra/:id", obtenerDetallesCompraPorCompra); // GET /api/detalle_compras/por_compra/:id
router.post("/", registrarDetalleCompra);                  // POST /api/detalle_compras
router.patch("/:id", actualizarDetalleCompra);             // PATCH /api/detalle_compras/:id
router.delete("/:id", eliminarDetalleCompra);              // DELETE /api/detalle_compras/:id

export default router;
