const express = require('express');
const librosController = require('../controllers/librosController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// Proteger todas las rutas de libros con autenticación
router.use(requireAuth);

router.get('/', librosController.listar);
router.get('/nuevo', librosController.formulario);
router.post('/nuevo', librosController.crear);

module.exports = router;
