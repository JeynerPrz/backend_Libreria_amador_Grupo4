import { Router } from 'express';
import { obtenerVentas,obtenerVenta,registrarVenta,eliminarVenta,actualizarVentaPatch } from '../controllers/ventas.controller.js';

const router = Router();

// Ruta para obtener todas las ventas
router.get('/Ventas', obtenerVentas);

// Obtener una categoría por ID
router.get('/venta/:id_venta', obtenerVenta);

router.post('/registrarVenta', registrarVenta);

// Eliminar una categoría por ID
router.delete('/eliminarVenta/:id_venta', eliminarVenta);

// Actualizar parcialmente una categoría por su ID
router.patch('/actualizarVenta/:id_venta', actualizarVentaPatch);

export default router;
