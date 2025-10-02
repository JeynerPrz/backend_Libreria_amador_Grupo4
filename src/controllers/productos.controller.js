import { pool } from '../../db_connection.js';

export const obtenerProductos = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM Productos");
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los Categorias.",
      error: error,
    });
  }
};

export const obtenerProducto = async (req, res) => {
  try {
    const ID_Producto = req.params.ID_Producto;
    const [result] = await pool.query("SELECT * FROM Productos WHERE ID_Producto= ?",[ID_Producto]
    );
    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. ID ${ID_Producto} no encontrado.`,
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos de los empleados.",
    });
  }
};


export const registrarProductos = async (req, res) => {
  try {
    const { Nombre, Descripcion, Cantidad, Precio_Comp, Precio_Vent } = req.body;
    const [result] = await pool.query(
      "INSERT INTO Productos (Nombre, Descripcion, Cantidad, Precio_Comp, Precio_Vent) VALUES (?, ?, ?, ?, ?)", 
      [Nombre, Descripcion, Cantidad, Precio_Comp, Precio_Vent]);
    res.status(201).json({ ID_Producto: result.insertId });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al registrar la categoría.",
      error: error,
    });
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    const ID_Producto = req.params.ID_Producto;
    const [result] = await pool.query(
      'DELETE FROM Productos WHERE ID_Producto = ?',
      [ID_Producto]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar el producto. El ID ${ID_Producto} no fue encontrado.`
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

export const actualizarProductoPatch = async (req, res) => {
  try {
    const { ID_Producto } = req.params;
    const datos = req.body;

    const [result] = await pool.query(
      "UPDATE Productos SET ? WHERE ID_Producto = ?",
      [datos, ID_Producto]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Producto con ID ${ID_Producto} no encontrado.`,
      });
    }

    res.status(200).json({
      mensaje: `Producto con ID ${ID_Producto} actualizado.`,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el producto.",
      error,
    });
  }
};