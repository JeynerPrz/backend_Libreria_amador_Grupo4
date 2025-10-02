import { Router } from 'express';

import {obtenerProductos,obtenerProducto,registrarProductos,eliminarProducto,actualizarProductoPatch} from '../controllers/productos.controller.js';

const router = Router();

// Obtener todas las categorías
router.get('/productos', obtenerProductos);

// Obtener una categoría por ID
router.get('/producto/:ID_Producto', obtenerProducto);

// Registrar una nueva categoría
router.post('/RegistrarProductos', registrarProductos);

// Eliminar una categoría por ID
router.delete('/EliminarProducto/:ID_Producto', eliminarProducto);

// Actualizar una categoría por ID
router.patch('/ActualizarProducto/:ID_Producto', actualizarProductoPatch);

export default router;