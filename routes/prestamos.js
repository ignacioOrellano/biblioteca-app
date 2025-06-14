const express = require('express');
const prestamosController = require('../controllers/prestamosController');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Proteger todas las rutas de préstamos con autenticación
router.use(requireAuth);

router.get('/', requireAdmin, prestamosController.listar);
router.get('/usuario', prestamosController.porUsuario);
router.get('/nuevo', requireAdmin, prestamosController.formulario);
router.post('/nuevo', requireAdmin, prestamosController.crear);
router.post('/:id/devolver', prestamosController.devolver);

module.exports = router;
