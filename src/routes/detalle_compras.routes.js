import { Router } from 'express';
import { obtenerDetalleCompras } from '../controllers/detalle_compras.controller.js';

const router = Router();

// Ruta para obtener todos los detalles de compras
router.get('/', obtenerDetalleCompras);

export default router;
