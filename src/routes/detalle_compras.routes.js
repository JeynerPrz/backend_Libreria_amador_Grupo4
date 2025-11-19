import { Router } from 'express';
import { 
  obtenerDetalle_Compras, 
  obtenerDetalles_Compra, 
  registrarDetallesCompras, 
  eliminarDetalleCompra, 
  actualizarDetallesCompraPatch
} from '../controllers/detalle_compras.controller.js';

const router = Router();

// Obtener todos los detalles de una compra (ruta que usa tu frontend)
router.get('/compras/:id_compra/detalles', obtenerDetalles_Compra);

// Obtener detalles por ID de compra (ruta alterna)
router.get('/detallescompra/:id_compra', obtenerDetalles_Compra);

// Registrar detalles de compra
router.post('/registrardetallescompra', registrarDetallesCompras);

// Eliminar un detalle de compra
router.delete('/eliminardetallecompra/:id_detalle_compra', eliminarDetalleCompra);

// Actualizar parcialmente un detalle de compra
router.patch('/actualizardetallecompra/:id_detalle_compra', actualizarDetallesCompraPatch);

export default router;
