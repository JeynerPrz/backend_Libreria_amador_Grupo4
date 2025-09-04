import { Router } from 'express';
import { obtenerDetalleVentas } from '../controllers/detalle_ventas.controller.js';

const router = Router();

// Ruta para obtener todos los detalles de ventas
router.get('/', obtenerDetalleVentas);

export default router;
