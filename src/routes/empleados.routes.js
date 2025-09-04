import { Router } from 'express';
import { obtenerEmpleados } from '../controllers/empleados.controller.js';

const router = Router();

// Ruta para obtener todos los empleados
router.get('/', obtenerEmpleados);

export default router;
