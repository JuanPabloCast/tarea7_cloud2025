-- Creado en una base de datos llamada 'proyecto': proyecto.usuarios y proyecto.tarea
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  birthdate DATE,
  password VARCHAR(255) NOT NULL,
  genero VARCHAR(50)
);

CREATE TABLE tarea (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  prioridad ENUM('ALTA', 'MEDIA', 'BAJA') NOT NULL,
  descripcion TEXT,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  status ENUM('ACTIVA', 'FINALIZADA') DEFAULT 'ACTIVA',
  usuario_id INT NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
