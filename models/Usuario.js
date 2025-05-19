const connection = require('./db');

// Obtener todos los usuarios
function getAll(callback) {
  connection.query('SELECT * FROM usuarios', (err, results) => {
    callback(err, results);
  });
}

// Obtener un usuario por ID
function getById(id, callback) {
  connection.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
    callback(err, results[0]);
  });
}

// Crear un usuario
function create(data, callback) {
  const { nombre, email, dni } = data;
  connection.query(
    'INSERT INTO usuarios (nombre, email, dni) VALUES (?, ?, ?)',
    [nombre, email, dni],
    (err, result) => {
      callback(err, result);
    }
  );
}

// Actualizar un usuario
function update(id, data, callback) {
  const { nombre, email, password } = data;
  connection.query(
    'UPDATE usuarios SET nombre = ?, email = ?, password = ? WHERE id = ?',
    [nombre, email, password, id],
    (err, result) => {
      callback(err, result);
    }
  );
}

// Eliminar un usuario
function deleteById(id, callback) {
  connection.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
    callback(err, result);
  });
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
