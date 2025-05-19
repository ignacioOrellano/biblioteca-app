const Prestamo = require('../models/Prestamo');
const Usuario = require('../models/Usuario');
const Libro = require('../models/Libro');

function listar(req, res) {
  Prestamo.getAllNoDevolucionConDatos((err, prestamos) => {
    if (err) {
      console.error(err);
      return res.status(500).render('prestamos/lista', {
        error: 'Error al listar préstamos'
      });
    }
    res.render('prestamos/lista', { prestamos });
  });
}

function formulario(req, res) {
  Usuario.getAll((err, usuarios) => {
    if (err) {
      console.error(err);
      return res.status(500).render('prestamos/formulario', {
        error: 'Error al listar usuarios'
      });
    }
    Libro.getAll((err, libros) => {
      if (err) {
        console.error(err);
        return res.status(500).render('prestamos/formulario', {
          error: 'Error al listar libros'
        });
      }
      res.render('prestamos/formulario', { usuarios, libros });
    });
  });
}

function crear(req, res) {
  Prestamo.create(req.body, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).render('prestamos/formulario', {
        error: 'Error al crear el préstamo'
      });
    }
    res.redirect('/prestamos');
  });
}

function devolver(req, res) {
  Prestamo.getById(req.params.id, (err, prestamo) => {
    if (err) {
      console.error(err);
      return res.status(500).render('prestamos/lista', {
        error: 'Error al devolver el préstamo'
      });
    }
    if (!prestamo) {
      return res.status(404).render('prestamos/lista', {
        error: 'Préstamo no encontrado'
      });
    }
    fecha_devolucion = new Date();
    const prestamoActualizado = {
      ...prestamo,
      fecha_devolucion
    }
    Prestamo.update(prestamo.id, prestamoActualizado, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).render('prestamos/lista', {
          error: 'Error al actualizar el préstamo'
        });
      }
    });
    res.redirect('/prestamos');
  });
}

module.exports = {
  listar,
  formulario,
  crear,
  devolver
};
