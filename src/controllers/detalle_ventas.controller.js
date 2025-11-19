import { pool } from '../../db/db_connection.js';

// Obtener todos los detalles de venta
export const obtenerDetalles_Ventas = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM Detalle_Ventas");
    res.json(result);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los detalles de ventas.",
      error,
    });
  }
};

// Obtener un detalle por ID
export const obtenerDetalles_Venta = async (req, res) => {
  try {
    const id_detalle = req.params.id_detalle;

    const [result] = await pool.query(
      "SELECT * FROM Detalle_Ventas WHERE ID_Detalle_Ven = ?",
      [id_detalle]
    );

    if (result.length === 0) {
      return res.status(404).json({
        mensaje: `No se encontró el detalle de venta con ID ${id_detalle}`,
      });
    }

    res.json(result[0]);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener el detalle de venta.",
      error,
    });
  }
};

// Registrar un nuevo detalle de venta
export const registrarDetallesVentas = async (req, res) => {
  try {
    const { ID_Venta, ID_Producto, Cantidad_Ven, Precio_Ven } = req.body;

    const [result] = await pool.query(
      "INSERT INTO Detalle_Ventas (ID_Venta, ID_Producto, Cantidad_Ven, Precio_Ven) VALUES (?, ?, ?, ?)",
      [ID_Venta, ID_Producto, Cantidad_Ven, Precio_Ven]
    );

    res.status(201).json({
      mensaje: "Detalle de venta registrado exitosamente.",
      ID_Detalle_Ven: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al registrar el detalle de venta.",
      error,
    });
  }
};

// Eliminar detalle de venta
export const eliminarDetalleVenta = async (req, res) => {
  try {
    const id_detalle = req.params.id_detalle;

    const [result] = await pool.query(
      "DELETE FROM Detalle_Ventas WHERE ID_Detalle_Ven = ?",
      [id_detalle]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `No se encontró el detalle de venta con ID ${id_detalle}`,
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar el detalle de venta.",
      error,
    });
  }
};

// Actualizar detalle de venta
export const actualizarDetallesVentaPatch = async (req, res) => {
  try {
    const id_detalle = req.params.id_detalle;
    const datos = req.body;

    const [result] = await pool.query(
      "UPDATE Detalle_Ventas SET ? WHERE ID_Detalle_Ven = ?",
      [datos, id_detalle]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `No se encontró el detalle de venta con ID ${id_detalle}`,
      });
    }

    res.json({
      mensaje: `Detalle de venta con ID ${id_detalle} actualizado correctamente.`,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el detalle de venta.",
      error,
    });
  }
};
