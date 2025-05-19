const connection = require('./db');

// Obtener todos los libros
function getAll(callback) {
  connection.query('SELECT * FROM libros', (err, results) => {
    callback(err, results);
  });
}

// Obtener un libro por ID
function getById(id, callback) {
  connection.query('SELECT * FROM libros WHERE id = ?', [id], (err, results) => {
    callback(err, results[0]);
  });
}

// Obtener un libro por ISBN
function getByIsbn(isbn, callback) {
  connection.query('SELECT * FROM libros WHERE isbn = ?', [isbn], (err, results) => {
    callback(err, results[0]);
  });
}

// Crear un libro
function create(data, callback) {
  const { titulo, autor, anio_publicacion, categoria, isbn } = data;
  connection.query(
    'INSERT INTO libros (titulo, autor, anio_publicacion, categoria, isbn) VALUES (?, ?, ?, ?, ?)',
    [titulo, autor, anio_publicacion, categoria, isbn],
    (err, result) => {
      callback(err, result);
    }
  );
}

// Actualizar un libro
function update(id, data, callback) {
  const { titulo, autor, anio_publicacion, categoria, isbn } = data;
  connection.query(
    'UPDATE libros SET titulo = ?, autor = ?, anio_publicacion = ?, categoria = ?, isbn = ? WHERE id = ?',
    [titulo, autor, anio_publicacion, categoria, isbn, id],
    (err, result) => {
      callback(err, result);
    }
  );
}

// Eliminar un libro
function deleteById(id, callback) {
  connection.query('DELETE FROM libros WHERE id = ?', [id], (err, result) => {
    callback(err, result);
  });
}

module.exports = {
  getAll,
  getById,
  getByIsbn,
  create,
  update,
  deleteById,
};
