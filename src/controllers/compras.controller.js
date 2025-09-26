import { pool } from "../../db_connection.js";

//  Obtener todas las compras
export const obtenerCompras = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM Compras");
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer las compras.",
      error: error,
    });
  }
};

//  Obtener una compra por ID
export const obtenerCompra = async (req, res) => {
  try {
    const id_compra = req.params.id_compra;
    const [result] = await pool.query(
      "SELECT * FROM Compras WHERE ID_Compra = ?",
      [id_compra]
    );

    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `No se encontró la compra con ID ${id_compra}.`,
      });
    }

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos de la compra.",
      error: error,
    });
  }
};

//  Registrar una nueva compra
export const registrarCompra = async (req, res) => {
  try {
    const { ID_Proveedor, ID_Empleado, Fecha_Compra, Total_Compra } = req.body;

    const [result] = await pool.query(
      "INSERT INTO Compras (ID_Proveedor, ID_Empleado, Fecha_Compra, Total_Compra) VALUES (?, ?, ?, ?)",
      [ID_Proveedor, ID_Empleado, Fecha_Compra, Total_Compra]
    );

    res.status(201).json({ 
      mensaje: "Compra registrada con éxito.",
      id_compra: result.insertId 
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al registrar la compra.",
      error: error,
    });
  }
};

//  Eliminar una compra por ID
export const eliminarCompra = async (req, res) => {
  try {
    const id_compra = req.params.id_compra;
    const [result] = await pool.query(
      "DELETE FROM Compras WHERE ID_Compra = ?",
      [id_compra]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `No se encontró la compra con ID ${id_compra}.`
      });
    }

    res.status(200).json({
      mensaje: `Compra con ID ${id_compra} eliminada correctamente.`
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al eliminar la compra.",
      error: error,
    });
  }
};
