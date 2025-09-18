const bcrypt = require('bcrypt');

module.exports = (app) => {
  const pool = require('../../config/database');

  // Ruta para obtener todos los usuarios
  app.get('/usuarios/register', (req, res) => {
    pool.getConnection()
      .then(conn => {
        conn.query('SELECT email, nombre, birthdate, genero FROM usuarios')
          .then(rows => res.json(rows))
          .catch(() => res.status(500).json({ error: 'Error al obtener los usuarios' }))
          .finally(() => conn.end());
      })
      .catch(() => res.status(500).json({ error: 'Error de conexión a la base de datos' }));
  });

  // Ruta para registrar un nuevo usuario
  app.post('/usuarios/register', async (req, res) => {
  const { email, nombre, birthdate, password, genero } = req.body;

  if (!email || !password || !nombre) {
    return res.status(400).json({ status: 1, mensaje: 'Faltan campos obligatorios' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const conn = await pool.getConnection();
    await conn.query(
      'INSERT INTO usuarios (email, nombre, birthdate, password, genero) VALUES (?, ?, ?, ?, ?)',
      [email, nombre, birthdate, hashedPassword, genero]
    );
    conn.end();

    res.status(201).json({ status: 0, mensaje: 'Usuario registrado correctamente' });

  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ status: 1, mensaje: 'El email ya está registrado' });
    } else {
      console.error(err);
      res.status(500).json({ status: 1, mensaje: 'Error al registrar usuario' });
    }
  }
});

// Ruta para el login de usuarios
  app.post('/usuarios/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: 1, mensaje: 'Email y contraseña son requeridos' });
    }

    try {
      const conn = await pool.getConnection();
      const result = await conn.query('SELECT * FROM usuarios WHERE email = ?', [email]);
      conn.end();

      if (result.length === 0) {
        return res.status(401).json({ status: 1, mensaje: 'Usuario no encontrado' });
      }

      const usuario = result[0];
      const passwordValida = await bcrypt.compare(password, usuario.password);

      if (!passwordValida) {
        return res.status(401).json({ status: 1, mensaje: 'Contraseña incorrecta' });
      }

      res.status(200).json({
        status: 0,
        mensaje: 'Login exitoso',
        usuario: {
          id: usuario.id,
          email: usuario.email,
          nombre: usuario.nombre
        }
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ status: 1, mensaje: 'Error interno del servidor' });
    }
  });
};
