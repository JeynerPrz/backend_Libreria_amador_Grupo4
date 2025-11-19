// src/routes/clientes.routes.js
import { pool } from '../../db/db_connection.js';

import { Router } from 'express';
import {
  obtenerClientes,
  obtenerCliente,
  registrarCliente,
  eliminarCliente,
  actualizarClientePatch
} from '../controllers/clientes.controller.js';

const router = Router();

// RUTAS QUE EL FRONTEND ESPERA
router.get('/clientes', obtenerClientes);                    // OK
router.get('/clientes/:ID_Cliente', obtenerCliente);         // NUEVA (para "Ver")
router.post('/RegistrarCliente', registrarCliente);          // OK
router.delete('/clientes/:ID_Cliente', eliminarCliente);     // CAMBIADA
router.put('/clientes/:ID_Cliente', actualizarClientePatch); // CAMBIADA (usa PUT)

export default router;