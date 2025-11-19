import { Router } from 'express';
import { pool } from '../../db/db_connection.js';

import { obtenerUsuarios } from '../controllers/usuarios.controller.js';

const router = Router();

// Ruta para obtener todos los usuarios
router.get('/', obtenerUsuarios);

export default router;
