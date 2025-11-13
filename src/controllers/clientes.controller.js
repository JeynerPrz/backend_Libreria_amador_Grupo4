// src/controllers/clientes.controller.js
import { pool } from '../../db_connection.js';

// Obtener todos los clientes
export const obtenerClientes = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM Clientes ORDER BY ID_Cliente DESC");
    res.json(result);
  } catch (error) {
    console.error("Error en obtenerClientes:", error);
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los clientes.",
      error: error.message,
    });
  }
};

// Obtener cliente por ID
export const obtenerCliente = async (req, res) => {
  try {
    const { ID_Cliente } = req.params;
    const [result] = await pool.query(
      "SELECT * FROM Clientes WHERE ID_Cliente = ?",
      [ID_Cliente]
    );

    if (result.length === 0) {
      return res.status(404).json({
        mensaje: `Cliente con ID ${ID_Cliente} no encontrado.`,
      });
    }

    res.json(result[0]);
  } catch (error) {
    console.error("Error en obtenerCliente:", error);
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos del cliente.",
      error: error.message,
    });
  }
};

// Registrar nuevo cliente
export const registrarCliente = async (req, res) => {
  try {
    const {
      Primer_Nombre,
      Segundo_Nombre,
      Primer_Apellido,
      Segundo_Apellido,
      Cedula,
      Contacto,
      Direccion
    } = req.body;

    const [result] = await pool.query(
      `INSERT INTO Clientes 
      (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Cedula, Contacto, Direccion) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Cedula, Contacto, Direccion]
    );

    res.status(201).json({
      mensaje: "Cliente registrado exitosamente.",
      ID_Cliente: result.insertId
    });
  } catch (error) {
    console.error("Error en registrarCliente:", error);
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al registrar el cliente.",
      error: error.message,
    });
  }
};

// Eliminar cliente
export const eliminarCliente = async (req, res) => {
  try {
    const { ID_Cliente } = req.params;
    const [result] = await pool.query(
      "DELETE FROM Clientes WHERE ID_Cliente = ?",
      [ID_Cliente]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Cliente con ID ${ID_Cliente} no encontrado.`
      });
    }

    res.status(200).json({
      mensaje: `Cliente con ID ${ID_Cliente} eliminado correctamente.`
    });
  } catch (error) {
    console.error("Error en eliminarCliente:", error);
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al eliminar el cliente.",
      error: error.message,
    });
  }
};

// Actualizar cliente (AHORA USA PUT, NO PATCH)
export const actualizarClientePatch = async (req, res) => {
  try {
    const { ID_Cliente } = req.params;
    const {
      Primer_Nombre,
      Segundo_Nombre,
      Primer_Apellido,
      Segundo_Apellido,
      Cedula,
      Contacto,
      Direccion
    } = req.body;

    // Validar que al menos un campo venga
    if (!Primer_Nombre && !Primer_Apellido && !Cedula) {
      return res.status(400).json({
        mensaje: "Debe enviar al menos un campo para actualizar."
      });
    }

    const [result] = await pool.query(
      `UPDATE Clientes SET 
        Primer_Nombre = COALESCE(?, Primer_Nombre),
        Segundo_Nombre = COALESCE(?, Segundo_Nombre),
        Primer_Apellido = COALESCE(?, Primer_Apellido),
        Segundo_Apellido = COALESCE(?, Segundo_Apellido),
        Cedula = COALESCE(?, Cedula),
        Contacto = COALESCE(?, Contacto),
        Direccion = COALESCE(?, Direccion)
       WHERE ID_Cliente = ?`,
      [
        Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido,
        Cedula, Contacto, Direccion, ID_Cliente
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Cliente con ID ${ID_Cliente} no encontrado.`
      });
    }

    res.status(200).json({
      mensaje: `Cliente con ID ${ID_Cliente} actualizado correctamente.`
    });
  } catch (error) {
    console.error("Error en actualizarClientePatch:", error);
    return res.status(500).json({
      mensaje: "Error al actualizar el cliente.",
      error: error.message,
    });
  }
};