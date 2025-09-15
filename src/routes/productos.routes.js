import { Router } from 'express';

import {obtenerProductos,obtenerProducto} from '../controllers/productos.controller.js';

const router = Router();

// Obtener todas las categorías
router.get('/productos', obtenerProductos);

// Obtener una categoría por ID
router.get('/producto/:ID_Producto', obtenerProducto);

export default router;