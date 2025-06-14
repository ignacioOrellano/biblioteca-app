const express = require('express');
const prestamosController = require('../controllers/prestamosController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// Proteger todas las rutas de préstamos con autenticación
router.use(requireAuth);

router.get('/', prestamosController.listar);
router.get('/usuario', prestamosController.porUsuario);
router.get('/nuevo', prestamosController.formulario);
router.post('/nuevo', prestamosController.crear);
router.post('/:id/devolver', prestamosController.devolver);

module.exports = router;
