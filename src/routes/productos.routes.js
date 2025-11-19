import { Router } from 'express';

import {
  obtenerProductos,
  obtenerProducto,
  registrarProductos,
  eliminarProducto,
  actualizarProductoPatch
} from '../controllers/productos.controller.js';

const router = Router();

// Obtener todos los productos
router.get('/productos', obtenerProductos);

// Obtener un producto por ID
router.get('/productos/:ID_Producto', obtenerProducto);

// Crear un producto
router.post('/productos', registrarProductos);

// Actualizar un producto
router.patch('/productos/:ID_Producto', actualizarProductoPatch);

// Eliminar un producto
router.delete('/productos/:ID_Producto', eliminarProducto);

export default router;
