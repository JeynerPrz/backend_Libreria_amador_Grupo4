import { pool } from "../../db/db_connection.js";


// Obtener TODOS los detalles de compra
export const obtenerDetalle_Compras = async (req, res) => {
    try {
        const [result] = await pool.query(`
            SELECT * FROM Detalle_Compras
        `);

        res.json(result);

    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los detalles", error });
    }
};



// Obtener detalles POR ID_COMPRA
export const obtenerDetalles_Compra = async (req, res) => {
    try {
        const { id_compra } = req.params;

        const query = `
            SELECT 
                dc.ID_Detalle_Com,
                dc.ID_Compra,
                dc.ID_Producto,
                dc.Cantidad_Com AS Cantidad,
                dc.Precio_Com AS Precio_Unitario,
                (dc.Cantidad_Com * dc.Precio_Com) AS Subtotal,
                
                p.Nombre AS Nombre_Producto,
                p.Descripcion,
                p.Precio_Comp,
                p.Precio_Vent,
                p.Cantidad AS Stock,
                p.Imagen
            FROM Detalle_Compras dc
            INNER JOIN Productos p 
                ON dc.ID_Producto = p.ID_Producto
            WHERE dc.ID_Compra = ?
            ORDER BY dc.ID_Detalle_Com ASC
        `;

        const [result] = await pool.query(query, [id_compra]);

        res.json(result);

    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los detalles de la compra", error });
    }
};



// Registrar un nuevo detalle de compra
export const registrarDetallesCompras = async (req, res) => {
    try {
        const { ID_Compra, ID_Producto, Cantidad_Com, Precio_Com } = req.body;

        const query = `
            INSERT INTO Detalle_Compras
            (ID_Compra, ID_Producto, Cantidad_Com, Precio_Com)
            VALUES (?, ?, ?, ?)
        `;

        const [result] = await pool.query(query, [
            ID_Compra, ID_Producto, Cantidad_Com, Precio_Com
        ]);

        res.status(201).json({
            mensaje: "Detalle registrado correctamente",
            id_detalle: result.insertId
        });

    } catch (error) {
        res.status(500).json({ mensaje: "Error al registrar detalle", error });
    }
};



// Eliminar detalle por ID
export const eliminarDetalleCompra = async (req, res) => {
    try {
        const { id_detalle_compra } = req.params;

        const [result] = await pool.query(
            "DELETE FROM Detalle_Compras WHERE ID_Detalle_Com = ?",
            [id_detalle_compra]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Detalle no encontrado" });
        }

        res.json({ mensaje: "Detalle eliminado correctamente" });

    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar detalle", error });
    }
};



// PATCH actualizar detalle de compra
export const actualizarDetallesCompraPatch = async (req, res) => {
    try {
        const { id_detalle_compra } = req.params;
        const datos = req.body;

        const [result] = await pool.query(
            "UPDATE Detalle_Compras SET ? WHERE ID_Detalle_Com = ?",
            [datos, id_detalle_compra]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: `El detalle con ID ${id_detalle_compra} no existe`
            });
        }

        res.json({
            mensaje: "Detalle actualizado correctamente"
        });

    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar detalle", error });
    }
};
