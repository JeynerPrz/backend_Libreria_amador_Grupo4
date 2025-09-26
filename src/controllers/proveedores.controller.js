import { pool } from "../../db_connection.js";

// ✅ Obtener todos los proveedores
export const obtenerProveedores = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM Proveedores");
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los proveedores.",
      error: error,
    });
  }
};

//  Obtener un proveedor por ID
export const obtenerProveedor = async (req, res) => {
  try {
    const id_proveedor = req.params.id_proveedor;
    const [result] = await pool.query(
      "SELECT * FROM Proveedores WHERE ID_Proveedor = ?",
      [id_proveedor]
    );

    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `No se encontró el proveedor con ID ${id_proveedor}.`,
      });
    }

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos del proveedor.",
      error: error,
    });
  }
};

//  Registrar un nuevo proveedor
export const registrarProveedor = async (req, res) => {
  try {
    const { Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Contacto, Correo } = req.body;

    const [result] = await pool.query(
      "INSERT INTO Proveedores (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Contacto, Correo) VALUES (?, ?, ?, ?, ?, ?)",
      [Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Contacto, Correo]
    );

    res.status(201).json({
      mensaje: "Proveedor registrado con éxito.",
      id_proveedor: result.insertId,
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al registrar el proveedor.",
      error: error,
    });
  }
};

// Eliminar un proveedor por ID
export const eliminarProveedor = async (req, res) => {
  try {
    const id_proveedor = req.params.id_proveedor;
    const [result] = await pool.query(
      "DELETE FROM Proveedores WHERE ID_Proveedor = ?",
      [id_proveedor]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `No se encontró el proveedor con ID ${id_proveedor}.`,
      });
    }

    res.status(200).json({
      mensaje: `Proveedor con ID ${id_proveedor} eliminado correctamente.`,
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al eliminar el proveedor.",
      error: error,
    });
  }
};
