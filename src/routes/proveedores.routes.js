import { Router } from "express";
import {
  obtenerProveedores,
  obtenerProveedor,
  registrarProveedor,
  actualizarProveedor,
  eliminarProveedor,
} from "../controllers/proveedores.controller.js";

const router = Router();

router.get("/proveedores", obtenerProveedores);
router.get("/proveedores/:ID_Proveedor", obtenerProveedor);
router.post("/proveedores", registrarProveedor);
router.put("/proveedores/:ID_Proveedor", actualizarProveedor);
router.delete("/proveedores/:ID_Proveedor", eliminarProveedor);

export default router;