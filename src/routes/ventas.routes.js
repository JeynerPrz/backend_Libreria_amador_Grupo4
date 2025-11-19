import { Router } from 'express';
import { obtenerVentas, obtenerVenta, registrarVenta, eliminarVenta, actualizarVentaPatch } from '../controllers/ventas.controller.js';

const router = Router();

// Ruta para obtener todas las ventas
router.get('/ventas', obtenerVentas);

// Obtener una venta por ID
router.get('/ventas/:id_venta', obtenerVenta);

router.post('/ventas', registrarVenta);

// Eliminar una venta por ID
router.delete('/ventas/:id_venta', eliminarVenta);

// Actualizar parcialmente una venta por su ID
router.patch('/ventas/:id_venta', actualizarVentaPatch);

export default router;
