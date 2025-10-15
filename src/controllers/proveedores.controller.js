import { pool } from "../../db_connection.js";

// Obtener todos los proveedores
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

// Obtener un proveedor por ID
export const obtenerProveedor = async (req, res) => {
  try {
    const ID_Proveedor = req.params.ID_Proveedor;
    const [result] = await pool.query(
      "SELECT * FROM Proveedores WHERE ID_Proveedor = ?",
      [ID_Proveedor]
    );

    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. ID ${ID_Proveedor} no encontrado.`,
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

// Registrar un nuevo proveedor
export const registrarProveedor = async (req, res) => {
  try {
    const { Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Contacto, Correo } = req.body;

    const [result] = await pool.query(
      "INSERT INTO Proveedores (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Contacto, Correo) VALUES (?, ?, ?, ?, ?, ?)",
      [Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Contacto, Correo]
    );

    res.status(201).json({ ID_Proveedor: result.insertId });
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
    const ID_Proveedor = req.params.ID_Proveedor;
    const [result] = await pool.query(
      "DELETE FROM Proveedores WHERE ID_Proveedor = ?",
      [ID_Proveedor]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar el proveedor. El ID ${ID_Proveedor} no fue encontrado.`,
      });
    }

    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al eliminar el proveedor.",
      error: error,
    });
  }
};

// Actualizar proveedor por ID (PATCH)
export const actualizarProveedorPatch = async (req, res) => {
  try {
    const { ID_Proveedor } = req.params;
    const datos = req.body;

    const [result] = await pool.query(
      "UPDATE Proveedores SET ? WHERE ID_Proveedor = ?",
      [datos, ID_Proveedor]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Proveedor con ID ${ID_Proveedor} no encontrado.`,
      });
    }

    res.status(200).json({
      mensaje: `Proveedor con ID ${ID_Proveedor} actualizado.`,
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al actualizar el proveedor.",
      error,
    });
  }
};
