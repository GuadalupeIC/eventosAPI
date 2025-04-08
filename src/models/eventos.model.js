import { pool } from "../db.js";

export const getAllEvents = async () => {
    const [rows] = await pool.execute('SELECT id, nombre, DATE_FORMAT(fecha, \'%d/%m/%Y\') as fecha, lugar_nombre, latitud, longitud, numero_asistentes FROM eventos ORDER BY fecha DESC');
    return rows;
};

export const getEventById = async (id) => {
    const [rows] = await pool.execute('SELECT id, nombre, DATE_FORMAT(fecha, \'%d/%m/%Y\') as fecha, lugar_nombre, latitud, longitud, numero_asistentes FROM eventos WHERE id = ?', [id]);
    return rows[0];
};

export const createEvent = async ({ nombre, fecha, lugar_nombre, latitud, longitud, numero_asistentes }) => {
    const [result] = await pool.execute(
        'INSERT INTO eventos (nombre, fecha, lugar_nombre, latitud, longitud, numero_asistentes) VALUES (?, ?, ?, ?, ?, ?)',
        [nombre, fecha, lugar_nombre, latitud, longitud, numero_asistentes]
    );
    return { id: result.insertId };
};

export const updateEvent = async (id, { nombre, fecha, lugar_nombre, latitud, longitud, numero_asistentes }) => {
    const [result] = await pool.execute(
        `UPDATE eventos 
         SET 
           nombre = COALESCE(?, nombre),
           fecha = COALESCE(?, fecha),
           lugar_nombre = COALESCE(?, lugar_nombre),
           latitud = COALESCE(?, latitud),
           longitud = COALESCE(?, longitud),
           numero_asistentes = COALESCE(?, numero_asistentes)
         WHERE id = ?`,
        [nombre, fecha, lugar_nombre, latitud, longitud, numero_asistentes, id]
    );
    return result.affectedRows;
};


export const deleteEvent = async (id) => {
    const [result] = await pool.execute('DELETE FROM eventos WHERE id = ?', [id]);
    return result.affectedRows;
};
