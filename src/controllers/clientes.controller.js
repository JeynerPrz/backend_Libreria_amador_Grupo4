// src/controllers/clientes.controller.js
import { pool } from '../../db_connection.js';

// Obtener todos los clientes
export const obtenerClientes = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM Clientes");
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los clientes.",
      error: error,
    });
  }
};

// Obtener cliente por ID
export const obtenerCliente = async (req, res) => {
  try {
    const ID_Cliente = req.params.ID_Cliente;
    const [result] = await pool.query(
      "SELECT * FROM Clientes WHERE ID_Cliente = ?",
      [ID_Cliente]
    );

    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Cliente con ID ${ID_Cliente} no encontrado.`,
      });
    }

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos del cliente.",
      error,
    });
  }
};

// Registrar nuevo cliente
export const registrarCliente = async (req, res) => {
  try {
    const { Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Cedula, Contacto, Direccion } = req.body;
    const [result] = await pool.query(
      `INSERT INTO Clientes 
      (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Cedula, Contacto, Direccion) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`, 
      [Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Cedula, Contacto, Direccion]
    );

    res.status(201).json({ ID_Cliente: result.insertId });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al registrar el cliente.",
      error,
    });
  }
};

// Eliminar cliente
export const eliminarCliente = async (req, res) => {
  try {
    const ID_Cliente = req.params.ID_Cliente;
    const [result] = await pool.query(
      "DELETE FROM Clientes WHERE ID_Cliente = ?",
      [ID_Cliente]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar el cliente. El ID ${ID_Cliente} no fue encontrado.`
      });
    }

    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al eliminar el cliente.",
      error,
    });
  }
};

// Actualizar cliente (PATCH)
export const actualizarClientePatch = async (req, res) => {
  try {
    const { ID_Cliente } = req.params;
    const datos = req.body;

    const [result] = await pool.query(
      "UPDATE Clientes SET ? WHERE ID_Cliente = ?",
      [datos, ID_Cliente]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Cliente con ID ${ID_Cliente} no encontrado.`,
      });
    }

    res.status(200).json({
      mensaje: `Cliente con ID ${ID_Cliente} actualizado.`,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el cliente.",
      error,
    });
  }
};