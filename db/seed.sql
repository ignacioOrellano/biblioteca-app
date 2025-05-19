-- Usuarios
INSERT INTO biblioteca_db_mysql.usuarios (nombre, email, dni) VALUES
('Juan Pérez', 'juan@example.com', '12345678'),
('Ana Gómez', 'ana@example.com', '23456789'),
('Carlos Ruiz', 'carlos@example.com', '34567890'),
('María López', 'maria@example.com', '45678901');

-- Libros
INSERT INTO biblioteca_db_mysql.libros (titulo, autor, anio_publicacion, categoria, isbn) VALUES
('Cien años de soledad', 'Gabriel García Márquez', 1967, 'Novela', '9780307474728'),
('El Principito', 'Antoine de Saint-Exupéry', 1943, 'Fábula', '9780156013987'),
('Rayuela', 'Julio Cortázar', 1963, 'Novela', '9788437602210'),
('Harry Potter y la piedra filosofal', 'J.K. Rowling', 1997, 'Fantasía', '9788478884452'),
('Harry Potter y la cámara secreta', 'J.K. Rowling', 1998, 'Fantasía', '9788478884957'),
('Harry Potter y el prisionero de Azkaban', 'J.K. Rowling', 1999, 'Fantasía', '9788478885190'),
('Harry Potter y el cáliz de fuego', 'J.K. Rowling', 2000, 'Fantasía', '9788478886456'),
('Harry Potter y la Orden del Fénix', 'J.K. Rowling', 2003, 'Fantasía', '9788478887347'),
('Harry Potter y el misterio del príncipe', 'J.K. Rowling', 2005, 'Fantasía', '9788478889907'),
('Harry Potter y las Reliquias de la Muerte', 'J.K. Rowling', 2007, 'Fantasía', '9788498381405'),
('El Hobbit', 'J.R.R. Tolkien', 1937, 'Fantasía', '9788445071972'),
('El eternauta', 'Jorge Luis Borges', 1944, 'Cuento', '9789871138011'),
('Una historia de dos ciudades', 'Charles Dickens', 1859, 'Novela', '9788491050292'),
('Game of Thrones', 'George R.R. Martin', 1996, 'Fantasía', '9780553103540');

-- Préstamos
INSERT INTO biblioteca_db_mysql.prestamos (usuario_id, libro_id, fecha_prestamo, fecha_devolucion) VALUES
(1, 1, CURRENT_DATE, NULL),
(1, 2, CURRENT_DATE, NULL),
(1, 3, CURRENT_DATE, NULL),
(2, 2, CURRENT_DATE, NULL),
(3, 3, CURRENT_DATE, NULL);
