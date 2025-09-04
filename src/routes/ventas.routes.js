import { Router } from 'express';
import { obtenerVentas } from '../controllers/ventas.controller.js';

const router = Router();

// Ruta para obtener todas las ventas
router.get('/', obtenerVentas);

export default router;
