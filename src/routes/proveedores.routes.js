import { Router } from "express";

import {
  obtenerProveedores,
  obtenerProveedor,
  registrarProveedor,
  actualizarProveedor,
  eliminarProveedor,
} from "../controllers/proveedores.controller.js";

const router = Router();

// NO repetir /proveedores aquí
router.get("/", obtenerProveedores);
router.get("/:ID_Proveedor", obtenerProveedor);
router.post("/", registrarProveedor);
router.put("/:ID_Proveedor", actualizarProveedor);
router.delete("/:ID_Proveedor", eliminarProveedor);

export default router;
