// src/controllers/clientes.controller.js
import { pool } from '../../db/db_connection.js';


// Obtener todos los clientes (ordenados de MENOR a MAYOR ID)
export const obtenerClientes = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM Clientes ORDER BY ID_Cliente ASC");
    res.json(result); // ¡FALTABA ESTA LÍNEA!
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

// ACTUALIZAR CLIENTE (SOLO LOS CAMPOS ENVIADOS)
export const actualizarClientePatch = async (req, res) => {
  try {
    const { ID_Cliente } = req.params;
    const campos = req.body;

    // Campos permitidos
    const camposPermitidos = [
      'Primer_Nombre',
      'Segundo_Nombre',
      'Primer_Apellido',
      'Segundo_Apellido',
      'Cedula',
      'Contacto',
      'Direccion'
    ];

    // Filtrar solo los campos que vienen y no son vacíos
    const camposActualizados = {};
    for (const campo of camposPermitidos) {
      if (campos[campo] !== undefined && campos[campo] !== null && campos[campo] !== '') {
        camposActualizados[campo] = campos[campo];
      }
    }

    if (Object.keys(camposActualizados).length === 0) {
      return res.status(400).json({
        mensaje: "Debe enviar al menos un campo válido para actualizar."
      });
    }

    // Construir SET dinámico
    const setClause = Object.keys(camposActualizados)
      .map(campo => `${campo} = ?`)
      .join(', ');

    const valores = Object.values(camposActualizados);
    valores.push(ID_Cliente);

    const [result] = await pool.query(
      `UPDATE Clientes SET ${setClause} WHERE ID_Cliente = ?`,
      valores
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