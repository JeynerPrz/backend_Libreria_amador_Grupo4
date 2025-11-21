import { pool } from "../../db/db_connection.js";

// Obtener todos los detalles (opcional)
export const obtenerDetalle_Compras = async (req, res) => {
  try {
    const [result] = await pool.query(`SELECT * FROM Detalle_Compras`);
    res.json(result);
  } catch (error) {
    console.error("ERROR obtenerDetalle_Compras:", error.message);
    res.status(500).json({ mensaje: "Error al obtener los detalles", error: error.message });
  }
};

// Obtener detalles por ID_COMPRA
export const obtenerDetallesCompraPorCompra = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(
      `SELECT 
         dc.ID_Detalle_Com AS ID_Detalle,
         dc.ID_Compra,
         dc.ID_Producto,
         dc.Cantidad_Com AS Cantidad,
         dc.Precio_Com AS Precio_Unitario,
         (dc.Cantidad_Com * dc.Precio_Com) AS Subtotal,
         p.Nombre AS Nombre_Producto,
         p.Descripcion,
         p.Precio_Comp,
         p.Precio_Vent,
         p.Cantidad AS Stock,
         p.Imagen
       FROM Detalle_Compras dc
       INNER JOIN Productos p ON dc.ID_Producto = p.ID_Producto
       WHERE dc.ID_Compra = ?
       ORDER BY dc.ID_Detalle_Com ASC`,
      [id]
    );

    res.json(result);
  } catch (error) {
    console.error("ERROR obtenerDetallesCompraPorCompra:", error.message);
    res.status(500).json({ mensaje: "Error al obtener detalles de compra", error: error.message });
  }
};

// Crear nuevo detalle
export const registrarDetalleCompra = async (req, res) => {
  try {
    const { ID_Compra, ID_Producto, Cantidad_Com, Precio_Com } = req.body;
    const [result] = await pool.query(
      `INSERT INTO Detalle_Compras (ID_Compra, ID_Producto, Cantidad_Com, Precio_Com)
       VALUES (?, ?, ?, ?)`,
      [ID_Compra, ID_Producto, Cantidad_Com, Precio_Com]
    );

    res.status(201).json({ mensaje: "Detalle registrado correctamente", id_detalle: result.insertId });
  } catch (error) {
    console.error("ERROR registrarDetalleCompra:", error.message);
    res.status(500).json({ mensaje: "Error al registrar detalle", error: error.message });
  }
};

// Actualizar detalle
export const actualizarDetalleCompra = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;

    const [result] = await pool.query(
      "UPDATE Detalle_Compras SET ? WHERE ID_Detalle_Com = ?",
      [datos, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ mensaje: "Detalle no encontrado" });

    res.json({ mensaje: "Detalle actualizado correctamente" });
  } catch (error) {
    console.error("ERROR actualizarDetalleCompra:", error.message);
    res.status(500).json({ mensaje: "Error al actualizar detalle", error: error.message });
  }
};

// Eliminar detalle
export const eliminarDetalleCompra = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(
      "DELETE FROM Detalle_Compras WHERE ID_Detalle_Com = ?",
      [id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ mensaje: "Detalle no encontrado" });

    res.json({ mensaje: "Detalle eliminado correctamente" });
  } catch (error) {
    console.error("ERROR eliminarDetalleCompra:", error.message);
    res.status(500).json({ mensaje: "Error al eliminar detalle", error: error.message });
  }
};
