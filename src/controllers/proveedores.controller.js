import { pool } from '../../db/db_connection.js';



// === OBTENER TODOS ===
export const obtenerProveedores = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Proveedores ORDER BY ID_Proveedor");
    res.json(rows);
  } catch (error) {
    console.error("Error en obtenerProveedores:", error);
    res.status(500).json({ mensaje: "Error al obtener proveedores" });
  }
};

// === OBTENER UNO ===
export const obtenerProveedor = async (req, res) => {
  try {
    const { ID_Proveedor } = req.params;
    const [rows] = await pool.query("SELECT * FROM Proveedores WHERE ID_Proveedor = ?", [ID_Proveedor]);
    if (rows.length === 0) return res.status(404).json({ mensaje: "Proveedor no encontrado" });
    res.json(rows[0]);
  } catch (error) {
    console.error("Error en obtenerProveedor:", error);
    res.status(500).json({ mensaje: "Error al obtener proveedor" });
  }
};

// === CREAR (SIN Dirección) ===
export const registrarProveedor = async (req, res) => {
  try {
    const { Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Contacto, Correo } = req.body;

    if (!Primer_Nombre || !Primer_Apellido || !Contacto || !Correo) {
      return res.status(400).json({ mensaje: "Faltan campos obligatorios" });
    }

    const [result] = await pool.query(
      `INSERT INTO Proveedores 
       (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Contacto, Correo)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [Primer_Nombre, Segundo_Nombre || null, Primer_Apellido, Segundo_Apellido || null, Contacto, Correo]
    );

    res.status(201).json({ ID_Proveedor: result.insertId });
  } catch (error) {
    console.error("Error en registrarProveedor:", error);
    res.status(500).json({ mensaje: "Error al crear proveedor" });
  }
};

// === ACTUALIZAR (SIN Dirección) ===
export const actualizarProveedor = async (req, res) => {
  try {
    const { ID_Proveedor } = req.params;
    const { Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Contacto, Correo } = req.body;

    if (!Primer_Nombre || !Primer_Apellido || !Contacto || !Correo) {
      return res.status(400).json({ mensaje: "Faltan campos obligatorios" });
    }

    const [result] = await pool.query(
      `UPDATE Proveedores 
       SET Primer_Nombre = ?, Segundo_Nombre = ?, Primer_Apellido = ?, 
           Segundo_Apellido = ?, Contacto = ?, Correo = ?
       WHERE ID_Proveedor = ?`,
      [Primer_Nombre, Segundo_Nombre || null, Primer_Apellido, Segundo_Apellido || null, Contacto, Correo, ID_Proveedor]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Proveedor no encontrado" });
    }

    res.json({ mensaje: "Proveedor actualizado" });
  } catch (error) {
    console.error("Error en actualizarProveedor:", error);
    res.status(500).json({ mensaje: "Error al actualizar" });
  }
};

// === ELIMINAR (con verificación de compras) ===
export const eliminarProveedor = async (req, res) => {
  try {
    const { ID_Proveedor } = req.params;

    // 1. Verificar si hay compras asociadas
    const [compras] = await pool.query(
      "SELECT 1 FROM Compras WHERE ID_Proveedor = ? LIMIT 1",
      [ID_Proveedor]
    );

    if (compras.length > 0) {
      return res.status(400).json({
        mensaje: "No se puede eliminar: el proveedor tiene compras asociadas.",
        tieneCompras: true,
      });
    }

    // 2. Eliminar
    const [result] = await pool.query(
      "DELETE FROM Proveedores WHERE ID_Proveedor = ?",
      [ID_Proveedor]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Proveedor no encontrado" });
    }

    res.status(204).send();

  } catch (error) {
    console.error("Error en eliminarProveedor:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};