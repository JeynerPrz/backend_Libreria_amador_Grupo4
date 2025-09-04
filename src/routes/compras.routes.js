import { Router } from 'express';
import { obtenerCompras } from '../controllers/compras.controller.js';

const router = Router();

// Ruta para obtener todas las compras
router.get('/', obtenerCompras);

export default router;
