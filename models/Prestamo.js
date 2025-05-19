const connection = require('./db');

// Obtener todos los préstamos
function getAll(callback) {
  connection.query('SELECT * FROM prestamos', (err, results) => {
    callback(err, results);
  });
}

// Obtener todos los prestamos no devueltos
function getAllNoDevolucion(callback) {
  connection.query('SELECT * FROM prestamos WHERE fecha_devolucion IS NULL', (err, results) => {
    callback(err, results);
  });
}

// Obtener todos los prestamos no devueltos, incluyendo datos de usuario y libro
function getAllNoDevolucionConDatos(callback) {
  const query = `
    SELECT p.*, u.nombre AS usuario_nombre, u.email AS usuario_email, l.titulo AS libro_titulo, l.autor AS libro_autor
    FROM prestamos p
    JOIN usuarios u ON p.usuario_id = u.id
    JOIN libros l ON p.libro_id = l.id
    WHERE p.fecha_devolucion IS NULL
  `;
  connection.query(query, (err, results) => {
    callback(err, results);
  });
}

// Obtener un préstamo por ID
function getById(id, callback) {
  connection.query('SELECT * FROM prestamos WHERE id = ?', [id], (err, results) => {
    callback(err, results[0]);
  });
}

// Obtener todos los préstamos de un usuario por su ID (callback)
function getByUserId(userId, callback) {
  const query = `
    SELECT p.*, l.titulo AS libro_titulo, l.autor AS libro_autor
    FROM prestamos p
    JOIN libros l ON p.libro_id = l.id
    WHERE p.usuario_id = ?
  `;
  connection.query(query, [userId], (err, results) => {
    callback(err, results);
  });
}

// Contar préstamos activos (no devueltos) de un usuario
function countActivosByUserId(userId, callback) {
  const query = `
    SELECT COUNT(*) AS cantidad
    FROM prestamos
    WHERE usuario_id = ? AND fecha_devolucion IS NULL
  `;
  connection.query(query, [userId], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0].cantidad);
  });
}

// Crear un préstamo
function create(data, callback) {
  const { usuarioId, libroId, fecha_prestamo } = data;
  connection.query(
    'INSERT INTO prestamos (usuario_id, libro_id, fecha_prestamo) VALUES (?, ?, CURRENT_DATE)',
    [usuarioId, libroId],
    (err, result) => {
      callback(err, result);
    }
  );
}

// Actualizar un préstamo
function update(id, data, callback) {
  const { usuario_id, libro_id, fecha_prestamo, fecha_devolucion } = data;
  connection.query(
    'UPDATE prestamos SET usuario_id = ?, libro_id = ?, fecha_prestamo = ?, fecha_devolucion = ? WHERE id = ?',
    [usuario_id, libro_id, fecha_prestamo, fecha_devolucion, id],
    (err, result) => {
      callback(err, result);
    }
  );
}

// Eliminar un préstamo
function deleteById(id, callback) {
  connection.query('DELETE FROM prestamos WHERE id = ?', [id], (err, result) => {
    callback(err, result);
  });
}

module.exports = {
  getAll,
  getAllNoDevolucion,
  getAllNoDevolucionConDatos,
  getById,
  getByUserId,
  create,
  update,
  deleteById,
  countActivosByUserId,
};
