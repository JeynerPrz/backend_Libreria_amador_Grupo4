// src/routes/clientes.routes.js
import { Router } from 'express';
import {
  obtenerClientes,
  obtenerCliente,
  registrarCliente,
  eliminarCliente,
  actualizarClientePatch
} from '../controllers/clientes.controller.js';

const router = Router();

// ✔ Rutas correctas alineadas con el frontend
router.get('/', obtenerClientes);
router.get('/:ID_Cliente', obtenerCliente);
router.post('/', registrarCliente);
router.delete('/:ID_Cliente', eliminarCliente);
router.put('/:ID_Cliente', actualizarClientePatch); 
// si quieres usar PATCH, solo cámbialo por router.patch

export default router;
