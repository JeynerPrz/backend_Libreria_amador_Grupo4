import { Router } from 'express';
import {
  obtenerDetalles_Ventas,
  obtenerDetalles_Venta,
  registrarDetallesVentas,
  eliminarDetalleVenta,
  actualizarDetallesVentaPatch
} from '../controllers/detalle_ventas.controller.js';

const router = Router();

// Obtener todos los detalles de ventas
router.get('/detalle-ventas', obtenerDetalles_Ventas);

// Obtener un detalle de venta por ID
router.get('/detalle-ventas/:id_detalle', obtenerDetalles_Venta);

// Registrar un nuevo detalle de venta
router.post('/detalle-ventas', registrarDetallesVentas);

// Eliminar un detalle de venta por ID
router.delete('/detalle-ventas/:id_detalle', eliminarDetalleVenta);

// Actualizar un detalle de venta por ID
router.patch('/detalle-ventas/:id_detalle', actualizarDetallesVentaPatch);

export default router;
