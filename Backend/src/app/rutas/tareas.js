const pool = require('../../config/database');

module.exports = (app) => {
  // Obtener tareas por usuario
  app.get('/tareas/:usuario_id/:status', async (req, res) => {
  const { usuario_id, status } = req.params;
  try {
    const conn = await pool.getConnection();
    const tareas = await conn.query(
      'SELECT * FROM tarea WHERE usuario_id = ? AND status = ? ORDER BY fecha_creacion ASC',
      [usuario_id, status]
      );
      conn.end();
      res.json({
        status: 0,
        mensaje: 'Tareas obtenidas correctamente',
        data: tareas
      });
    } catch (err) {
      res.status(500).json({ status: 1, mensaje: 'Error al obtener tareas' });
    }
  });


  // Crear nueva tarea
  app.post('/tareas', async (req, res) => {
    const { titulo, prioridad, descripcion, usuario_id } = req.body;
    try {
      const conn = await pool.getConnection();
      await conn.query(
        'INSERT INTO tarea (titulo, prioridad, descripcion, usuario_id) VALUES (?, ?, ?, ?)',
        [titulo, prioridad, descripcion, usuario_id]
      );
      conn.end();
      res.status(201).json({ mensaje: 'Tarea creada correctamente' });
    } catch (err) {
      res.status(500).json({ error: 'Error al crear tarea' });
    }
  });

  // Marcar tarea como finalizada
  app.put('/tareas/:id/finalizar', async (req, res) => {
    const { id } = req.params;
    try {
      const conn = await pool.getConnection();
      await conn.query(
        'UPDATE tarea SET status = "FINALIZADA" WHERE id = ?',
        [id]
      );
      conn.end();
      res.json({ mensaje: 'Tarea finalizada' });
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar tarea' });
    }
  });
};
