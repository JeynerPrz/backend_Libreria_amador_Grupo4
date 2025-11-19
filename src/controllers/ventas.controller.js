import { pool } from '../../db/db_connection.js';

// Obtener todas las Ventas
export const obtenerVentas = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Ventas');
        res.json(result);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ha ocurrido un error al leer los datos.',
            error: error
        });
    }
};

// Obtener una venta por ID
export const obtenerVenta = async (req, res) => {
  try {
    const id_venta = req.params.id_venta;

    const [result] = await pool.query(
      "SELECT * FROM Ventas WHERE ID_Venta = ?",
      [id_venta]
    );

    if (result.length === 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. ID ${id_venta} no encontrado.`,
      });
    }

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos de la venta.",
      error
    });
  }
};

// Registrar una nueva Venta
export const registrarVenta = async (req, res) => {
  try {
    const { Fecha_Venta, ID_Cliente, ID_Empleado, Total_Venta } = req.body;

    const [result] = await pool.query(
      "INSERT INTO Ventas (Fecha_Venta, ID_Cliente, ID_Empleado, Total_Venta) VALUES (?, ?, ?, ?)", 
      [Fecha_Venta, ID_Cliente, ID_Empleado, Total_Venta]
    );

    res.status(201).json({ ID_Venta: result.insertId });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al registrar la venta.",
      error: error,
    });
  }
};

// Eliminar una venta por ID
export const eliminarVenta = async (req, res) => {
  try {
    const id_venta = req.params.id_venta;

    const [result] = await pool.query(
      'DELETE FROM Ventas WHERE ID_Venta = ?',
      [id_venta]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar la venta. El ID ${id_venta} no fue encontrado.`
      });
    }

    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar la venta.',
      error: error
    });
  }
};

// Actualizar una venta parcialmente
export const actualizarVentaPatch = async (req, res) => {
  try {
    const id_venta = req.params.id_venta;
    const datos = req.body;

    const [result] = await pool.query(
      "UPDATE Ventas SET ? WHERE ID_Venta = ?",
      [datos, id_venta]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Venta con ID ${id_venta} no encontrada.`,
      });
    }

    res.status(200).json({
      mensaje: `Venta con ID ${id_venta} actualizada correctamente.`,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar la venta.",
      error,
    });
  }
};
