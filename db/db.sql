-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS biblioteca_db_mysql;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS biblioteca_db_mysql.usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  dni INT NOT NULL UNIQUE,
  fecha_registro DATE
);

-- Tabla de libros
CREATE TABLE IF NOT EXISTS biblioteca_db_mysql.libros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  autor VARCHAR(255) NOT NULL,
  anio_publicacion INT NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  isbn VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla de préstamos
CREATE TABLE IF NOT EXISTS biblioteca_db_mysql.prestamos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  libro_id INT NOT NULL,
  fecha_prestamo DATE,
  fecha_devolucion DATE,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (libro_id) REFERENCES libros(id) ON DELETE CASCADE
);
