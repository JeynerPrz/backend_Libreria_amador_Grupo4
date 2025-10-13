import { pool } from '../../db_connection.js';


// Obtener todas los DetalleCompras
export const obtenerDetalleCompras = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM DetalleCompras');
        res.json(result);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ha ocurrido un error al leer los datos.',
            error: error
        });
    }
};