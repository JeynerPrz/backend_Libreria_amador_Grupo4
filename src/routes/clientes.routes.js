import { Router } from 'express';

import {
  obtenerClientes,
  obtenerCliente,
  registrarCliente,
  eliminarCliente,
  actualizarClientePatch
} from '../controllers/clientes.controller.js';

const router = Router();

// Obtener todos los clientes
router.get('/clientes', obtenerClientes);

// Obtener un cliente por ID
router.get('/cliente/:ID_Cliente', obtenerCliente);

// Registrar un nuevo cliente
router.post('/RegistrarCliente', registrarCliente);

// Eliminar un cliente por ID
router.delete('/EliminarCliente/:ID_Cliente', eliminarCliente);

// Actualizar un cliente por ID
router.patch('/ActualizarCliente/:ID_Cliente', actualizarClientePatch);

export default router;
