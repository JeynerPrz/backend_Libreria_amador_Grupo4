import { Router } from 'express';
import { obtenerProveedores } from '../controllers/proveedores.controller.js';

const router = Router();

// Ruta para obtener todos los proveedores
router.get('/', obtenerProveedores);

export default router;
