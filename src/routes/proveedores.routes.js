import { Router } from "express";
import {
  obtenerProveedores,
  obtenerProveedor,
  registrarProveedor,
  eliminarProveedor,
} from "../controllers/proveedores.controller.js";

const router = Router();

// ✅ Obtener todos los proveedores
router.get("/proveedores", obtenerProveedores);

// ✅ Obtener un proveedor por ID
router.get("/proveedores/:id_proveedor", obtenerProveedor);

// ✅ Registrar un nuevo proveedor
router.post("/proveedores", registrarProveedor);

// ✅ Eliminar un proveedor por ID
router.delete("/proveedores/:id_proveedor", eliminarProveedor);

export default router;
