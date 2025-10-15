import { Router } from "express";
import {
  obtenerProveedores,
  obtenerProveedor,
  registrarProveedor,
  eliminarProveedor,
  actualizarProveedorPatch
} from "../controllers/proveedores.controller.js";

const router = Router();

// Obtener todos los proveedores
router.get("/proveedores", obtenerProveedores);

// Obtener un proveedor por ID
router.get("/proveedor/:ID_Proveedor", obtenerProveedor);

// Registrar un nuevo proveedor
router.post("/RegistrarProveedor", registrarProveedor);

// Eliminar un proveedor por ID
router.delete("/EliminarProveedor/:ID_Proveedor", eliminarProveedor);

// Actualizar un proveedor por ID
router.patch("/ActualizarProveedor/:ID_Proveedor", actualizarProveedorPatch);

export default router;

