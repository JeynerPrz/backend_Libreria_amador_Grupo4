import { Router } from 'express';
import { obtenerUsuarios } from '../controllers/usuarios.controller.js';

const router = Router();

// Ruta para obtener todos los usuarios
router.get('/', obtenerUsuarios);

export default router;
