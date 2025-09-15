import { Router } from 'express';
import {obtenerDetalles_Ventas,obtenerDetalles_Venta} from '../controllers/detalle_ventas.controller.js';

const router = Router();

// Obtener todas las categorías
router.get('/detallesventas', obtenerDetalles_Ventas);

// Obtener una categoría por ID
router.get('/detallesventa/:ID_Detalle_Ven', obtenerDetalles_Venta);

export default router;