import { pool } from '../../db/db_connection.js';

// Obtener todas las categorías
export const obtenerDetalles_Ventas = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM Detalle_Ventas");
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los Categorias.",
      error: error,
    });
  }
};


export const obtenerDetalles_Venta = async (req, res) => {
  try {
    const ID_Detalle_Ven = req.params.ID_Detalle_Ven;
    const [result] = await pool.query("SELECT * FROM Detalle_Ventas WHERE ID_Detalle_Ven= ?",[ID_Detalle_Ven]
    );
    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. ID ${ID_Detalle_Ven} no encontrado.`,
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos de las categorias.",
    });
  }
};

export const registrarDetallesVentas = async (req, res) => {
  try {
    const { ID_Venta, ID_Producto, Cantidad_Ven, Precio_Ven } = req.body;
    const [result] = await pool.query(
      "INSERT INTO Detalle_Ventas (ID_Venta, ID_Producto, Cantidad_Ven, Precio_Ven) VALUES (?, ?, ?, ?)", 
      [ID_Venta, ID_Producto, Cantidad_Ven, Precio_Ven]
    );
    res.status(201).json({ ID_Detalle_Ven: result.insertId });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al registrar la categoría.",
      error: error,
    });
  }
};

export const eliminarDetalleVenta = async (req, res) => {
  try {
    const ID_Detalle_Vent = req.params.ID_Detalle_Vent;
    const [result] = await pool.query(
      'DELETE FROM Detalle_Ventas WHERE ID_Detalle_Vent = ?',
      [ID_Detalle_Vent]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar el detalle de venta. El ID ${ID_Detalle_Vent} no fue encontrado.`
      });
    }

    // Respuesta sin contenido para indicar éxito
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar la categoría.',
      error: error
    });
  }
};

export const actualizarDetallesVentaPatch = async (req, res) => {
  try {
    const { ID_Detalle_Ven } = req.params;
    const datos = req.body;

    const [result] = await pool.query(
      "UPDATE Detalle_Ventas SET ? WHERE ID_Detalle_Ven = ?",
      [datos, ID_Detalle_Ven]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Detalle de venta con ID ${ID_Detalle_Ven} no encontrado.`,
      });
    }

    res.status(200).json({
      mensaje: `Detalle de venta con ID ${ID_Detalle_Ven} actualizado.`,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el detalle de venta.",
      error,
    });
  }
};