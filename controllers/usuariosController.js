const Usuario = require('../models/Usuario');
const Prestamo = require('../models/Prestamo');

function listar(req, res) {
  Usuario.getAll((err, usuarios) => {
    if (err) {
      console.error(err);
      return res.status(500).render('usuarios/lista', {
        error: 'Error al listar usuarios'
      });
    }
    res.render('usuarios/lista', { usuarios });
  });
}

function formulario(req, res) {
  res.render('usuarios/formulario');
}

function crear(req, res) {
  const usuario = req.body;
  // Validamos campos
  if (!usuario.nombre || !usuario.dni || !usuario.email) {
    return res.status(400).render('usuarios/formulario', {
      error: 'Todos los campos son obligatorios'
    });
  }

  // Validar que el usuario no exista con el mismo dni o email
  // SELECT * FROM usuarios WHERE dni = ? OR email = ?
  Usuario.getById(usuario.dni, (err, usuarioExistente) => {
    if (err) {
      console.error(err);
      return res.status(500).render('usuarios/formulario', {
        error: 'Error al verificar el usuario'
      });
    }
    if (usuarioExistente) {
      return res.status(400).render('usuarios/formulario', {
        error: 'El usuario ya existe'
      });
    }
    Usuario.create(usuario, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).render('usuarios/formulario', {
          error: 'Error al crear el usuario'
        });
      }
      res.redirect('/usuarios');
    })
  });
}

function prestamos(req, res) {
  const userId = req.params.id;
  Usuario.getById(userId, (err, usuario) => {
    if (err || !usuario) {
      console.error(err);
      return res.status(500).render('usuarios/prestamos', {
        error: 'Error al buscar el usuario'
      });
    }
    Prestamo.getByUserId(userId, (err2, prestamos) => {
      if (err2) {
        console.error(err2);
        return res.status(500).render('usuarios/prestamos', {
          error: 'Error al listar prestamos'
        });
      }
      res.render('usuarios/prestamos', { usuario, prestamos });
    });
  });
}

function cantidadPrestamos(req, res) {
  const userId = req.params.id;
  Usuario.getById(userId, (err, usuario) => {
    if (err || !usuario) {
      console.error(err);
      return res.status(500).render('usuarios/cantidad', {
        error: 'Error al buscar el usuario'
      });
    }
    Prestamo.countActivosByUserId(userId, (err2, cantidad) => {
      if (err2) {
        console.error(err2);
        return res.status(500).render('usuarios/cantidad', {
          error: 'Error al contar prestamos'
        });
      }
      res.render('usuarios/cantidad', { usuario, cantidad });
    });
  });
}

module.exports = {
  listar,
  formulario,
  crear,
  prestamos,
  cantidadPrestamos
};
