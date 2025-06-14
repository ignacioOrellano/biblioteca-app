const express = require('express');
const usuariosController = require('../controllers/usuariosController');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Proteger todas las rutas de usuarios con autenticación
router.use(requireAuth);

router.get('/', usuariosController.listar);
router.get('/nuevo', requireAdmin, usuariosController.formulario);
router.post('/nuevo', requireAdmin, usuariosController.crear);
router.get('/:id/prestamos', usuariosController.prestamos);
router.get('/:id/cantidad', usuariosController.cantidadPrestamos);

module.exports = router;
