import { pool } from "../../db/db_connection.js";

// Obtener todas las compras
export const obtenerCompras = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT 
        c.ID_Compra,
        c.Fecha_Compra,
        c.Total_Compra,
        CONCAT(
          p.Primer_Nombre, ' ', IFNULL(p.Segundo_Nombre,''), ' ',
          p.Primer_Apellido, ' ', IFNULL(p.Segundo_Apellido,'')
        ) AS Proveedor
      FROM Compras c
      LEFT JOIN Proveedores p ON c.ID_Proveedor = p.ID_Proveedor
      ORDER BY c.ID_Compra DESC
    `);

    res.json(result);
  } catch (error) {
    console.error("ERROR obtenerCompras:", error.message);
    res.status(500).json({ mensaje: "Error al obtener las compras", error: error.message });
  }
};

// Obtener una compra por ID
export const obtenerCompra = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(
      `SELECT * FROM Compras WHERE ID_Compra = ?`,
      [id]
    );

    if (result.length === 0)
      return res.status(404).json({ mensaje: "Compra no encontrada" });

    res.json(result[0]);
  } catch (error) {
    console.error("ERROR obtenerCompra:", error.message);
    res.status(500).json({ mensaje: "Error al obtener la compra", error: error.message });
  }
};

// Obtener detalles de una compra
export const obtenerDetallesCompra = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(
      `SELECT 
         dc.ID_Detalle_Com AS ID_Detalle,
         dc.ID_Compra,
         dc.ID_Producto,
         p.Nombre AS Nombre_Producto,
         dc.Cantidad_Com AS Cantidad,
         dc.Precio_Com AS Precio_Compra,
         (dc.Cantidad_Com * dc.Precio_Com) AS Subtotal
       FROM Detalle_Compras dc
       INNER JOIN Productos p ON dc.ID_Producto = p.ID_Producto
       WHERE dc.ID_Compra = ?
       ORDER BY dc.ID_Detalle_Com ASC`,
      [id]
    );

    res.json(result);
  } catch (error) {
    console.error("ERROR obtenerDetallesCompra:", error.message);
    res.status(500).json({ mensaje: "Error al obtener los detalles de la compra", error: error.message });
  }
};

// Registrar nueva compra
export const registrarCompra = async (req, res) => {
  try {
    const { ID_Proveedor, ID_Empleado, Fecha_Compra, Total_Compra = null } = req.body;
    const [result] = await pool.query(
      `INSERT INTO Compras (ID_Proveedor, ID_Empleado, Fecha_Compra, Total_Compra)
       VALUES (?, ?, ?, ?)`,
      [ID_Proveedor, ID_Empleado, Fecha_Compra, Total_Compra]
    );

    res.status(201).json({
      mensaje: "Compra registrada correctamente",
      id_compra: result.insertId,
    });
  } catch (error) {
    console.error("ERROR registrarCompra:", error.message);
    res.status(500).json({ mensaje: "Error al registrar la compra", error: error.message });
  }
};

// Actualizar compra
export const actualizarCompra = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;
    const [result] = await pool.query(
      "UPDATE Compras SET ? WHERE ID_Compra = ?",
      [datos, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ mensaje: "Compra no encontrada" });

    res.json({ mensaje: "Compra actualizada correctamente" });
  } catch (error) {
    console.error("ERROR actualizarCompra:", error.message);
    res.status(500).json({ mensaje: "Error al actualizar la compra", error: error.message });
  }
};

// Eliminar compra
export const eliminarCompra = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(
      "DELETE FROM Compras WHERE ID_Compra = ?",
      [id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ mensaje: "Compra no encontrada" });

    res.json({ mensaje: "Compra eliminada correctamente" });
  } catch (error) {
    console.error("ERROR eliminarCompra:", error.message);
    res.status(500).json({ mensaje: "Error al eliminar la compra", error: error.message });
  }
};
