import { Router } from 'express';
import {obtenerDetalles_Ventas,obtenerDetalles_Venta, registrarDetallesVentas,eliminarDetalleVenta,actualizarDetallesVentaPatch} from '../controllers/detalle_ventas.controller.js';
import { pool } from '../../db/db_connection.js';

const router = Router();

// Obtener todas las categorías
router.get('/detallesventas', obtenerDetalles_Ventas);

// Obtener una categoría por ID
router.get('/detallesventa/:ID_Detalle_Ven', obtenerDetalles_Venta);

// Registrar una nueva categoría
router.post('/RegistrarDetallesVentas', registrarDetallesVentas);

// Eliminar una categoría por ID
router.delete('/EliminarDetalleVenta/:ID_Detalle_Vent', eliminarDetalleVenta);

// Actualizar una categoría por ID
router.patch('/ActualizarDetallesVenta/:ID_Detalle_Vent', actualizarDetallesVentaPatch);

export default router;