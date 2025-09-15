import { pool } from '../../db_connection.js';
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