import { pool } from '../../db_connection.js';


// Obtener todas los DetalleCompras
export const obtenerDetalle_Compras = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Detalle_Compras');
        res.json(result);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ha ocurrido un error al leer los datos.',
            error: error
        });
    }
};

export const obtenerDetalles_Compra = async (req, res) => {
  try {
    const ID_Detalle_Com = req.params.ID_Detalle_Com;
    const [result] = await pool.query("SELECT * FROM Detalle_Compras WHERE ID_Detalle_Com= ?",[ID_Detalle_Com]
    );
    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. ID ${ID_Detalle_Com} no encontrado.`,
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos de las categorias.",
    });
  }
};

export const registrarDetallesCompras = async (req, res) => {
  try {
    const { ID_Compra, ID_Producto, Cantidad_Ven, Precio_Ven } = req.body;
    const [result] = await pool.query(
      "INSERT INTO Detalle_Compras (ID_Compra, ID_Producto, Cantidad_Ven, Precio_Ven) VALUES (?, ?, ?, ?)", 
      [ID_Compra, 
      ID_Producto, 
      Cantidad_Ven, 
      Precio_Ven
    ]);
    res.status(201).json({ ID_Detalle_Com: result.insertId });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al registrar la categoría.",
      error: error,
    });
  }
};


export const eliminarDetalleCompra = async (req, res) => {
  try {
    const ID_Detalle_Com = req.params.ID_Detalle_Com;
    const [result] = await pool.query(
      'DELETE FROM Detalle_Compras WHERE ID_Detalle_Com = ?',
      [ID_Detalle_Com]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar la categoría. El ID ${ID_Detalle_Com} no fue encontrado.`
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

export const actualizarDetallesCompraPatch = async (req, res) => {
  try {
    const { ID_Detalle_Com } = req.params;
    const datos = req.body;

    const [result] = await pool.query(
      "UPDATE Detalles_Compras SET ? WHERE ID_Detalle_Com = ?",
      [datos, ID_Detalle_Com]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Categoría con ID ${ID_Detalle_Com} no encontrada.`,
      });
    }

    res.status(200).json({
      mensaje: `Categoría con ID ${ID_Detalle_Com} actualizada.`,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar la categoría.",
      error,
    });
  }
};