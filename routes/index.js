const express = require('express');
const router = express.Router();
const { authenticateUser, logout } = require('../middleware/auth');

router.get('/', (req, res) => res.render('home'));

// Ruta para mostrar el formulario de login
router.get('/login', (req, res) => {
  // Si ya está autenticado, redirigir al inicio
  if (req.session.userId) {
    return res.redirect('/');
  }
  res.render('login');
});

// Ruta para procesar el login
router.post('/login', authenticateUser, (req, res) => {
  // Si llegamos aquí, la autenticación fue exitosa
  res.redirect('/');
});

// Ruta para logout
router.get('/logout', logout);

module.exports = router;
