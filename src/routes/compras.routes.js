import { Router } from "express";
import { pool } from "../../db_connection.js"; // ← AÑADIR ESTA LÍNEA
import {
  obtenerCompras,
  obtenerCompra,
  registrarCompra,
  eliminarCompra,
  actualizarCompra,
} from "../controllers/compras.controller.js";

const router = Router();

// === RUTAS EXISTENTES ===
router.get("/compras", obtenerCompras);
router.get("/compras/:id_compra", obtenerCompra);
router.post("/compras", registrarCompra);
router.delete("/compras/:id_compra", eliminarCompra);
router.patch("/compras/:id_compra", actualizarCompra);

// === NUEVA RUTA: Contar compras por proveedor ===
router.get("/compras/proveedor/:ID_Proveedor", async (req, res) => {
  try {
    const { ID_Proveedor } = req.params;
    
    const [rows] = await pool.query(
      "SELECT ID_Compra FROM Compras WHERE ID_Proveedor = ?",
      [ID_Proveedor]
    );

    res.json(rows); // Devuelve [] si no hay compras
  } catch (error) {
    console.error("Error al verificar compras del proveedor:", error);
    res.status(500).json({ 
      mensaje: "Error al verificar compras asociadas",
      error: error.message 
    });
  }
});

export default router;