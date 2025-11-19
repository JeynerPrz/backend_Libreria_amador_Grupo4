import { Router } from 'express';

import { 
  obtenerCompras,
  obtenerCompra,
  registrarCompra,
  eliminarCompra,
  actualizarCompra
} from '../controllers/compras.controller.js';

const router = Router();

// RUTAS FINALES:
// GET    /api/compras
// GET    /api/compras/:id_compra
// POST   /api/compras
// PUT    /api/compras/:id_compra
// DELETE /api/compras/:id_compra

router.get('/', obtenerCompras);
router.get('/:id_compra', obtenerCompra);
router.post('/', registrarCompra);
router.put('/:id_compra', actualizarCompra);
router.delete('/:id_compra', eliminarCompra);

export default router;
