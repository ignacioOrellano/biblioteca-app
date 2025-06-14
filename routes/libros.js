const express = require('express');
const librosController = require('../controllers/librosController');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Proteger todas las rutas de libros con autenticación
router.use(requireAuth);

router.get('/', librosController.listar);
router.get('/nuevo', requireAdmin, librosController.formulario);
router.post('/nuevo', requireAdmin, librosController.crear);

module.exports = router;
