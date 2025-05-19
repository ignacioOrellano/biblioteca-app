const Libro = require('../models/Libro');

function listar(req, res) {
  const libros = Libro.getAll((err, libros) => {
    if (err) {
      console.error(err);
      return res.status(500).render('libros/lista', {
        error: 'Error al listar libros'
      });
    }
    res.render('libros/lista', { libros });
  });
}

function formulario(req, res) {
  res.render('libros/formulario');
}

function crear(req, res) {
  const libro = req.body;
  // Validamos campos
  if (!libro.titulo || !libro.autor || !libro.isbn || !libro.categoria || !libro.anio_publicacion) {
    return res.status(400).render('libros/formulario', {
      error: 'Todos los campos son obligatorios'
    });
  }

  anoPublicacion = libro.anio_publicacion.split('-')[0];
  libro.anio_publicacion = anoPublicacion;


  // Validar que el libro no exista
  Libro.getByIsbn(libro.isbn, (err, libroExistente) => {
    if (err) {
      console.error(err);
      return res.status(500).render('libros/formulario', {
        error: 'Error al verificar el libro'
      });
    }
    if (libroExistente) {
      return res.status(400).render('libros/formulario', {
        error: 'El libro ya existe'
      });
    }
  });

  Libro.create(libro, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).render('libros/formulario', {
        error: 'Error al crear el libro'
      });
    }
    res.redirect('/libros');
  });
}

module.exports = {
  listar,
  formulario,
  crear
};
