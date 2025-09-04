import { pool } from '../../db_connection.js';

// Obtener todos los Proveedores
export const obtenerProveedores = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Proveedores');
        res.json(result);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ha ocurrido un error al leer los datos.',
            error: error
        });
    }
};
