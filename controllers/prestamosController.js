const Prestamo = require('../models/Prestamo');
const Usuario = require('../models/Usuario');
const Libro = require('../models/Libro');

async function listar(req, res) {
  try {
    const prestamos = await Prestamo.findAll({
      where: { fecha_devolucion: null },
      include: [Usuario, Libro]
    });
    res.render('prestamos/lista', { prestamos });
  } catch (error) {
    console.error(error);
    res.status(500).render('prestamos/lista', {
      error: 'Error al listar prestamos'
    });
  }
}

async function formulario(req, res) {
  const usuarios = await Usuario.findAll();
  const libros = await Libro.findAll();
  res.render('prestamos/formulario', { usuarios, libros });
}

async function crear(req, res) {
  await Prestamo.create(req.body);
  res.redirect('/prestamos');
}

async function devolver(req, res) {
  const prestamo = await Prestamo.findByPk(req.params.id);
  prestamo.fecha_devolucion = new Date();
  await prestamo.save();
  res.redirect('/prestamos');
}

module.exports = {
  listar,
  formulario,
  crear,
  devolver
};
