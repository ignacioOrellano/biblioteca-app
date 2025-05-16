const express = require('express');
const usuariosController = require('../controllers/usuariosController');

const router = express.Router();

router.get('/', usuariosController.listar);
router.get('/nuevo', usuariosController.formulario);
router.post('/nuevo', usuariosController.crear);
router.get('/:id/prestamos', usuariosController.prestamos);
router.get('/:id/cantidad', usuariosController.cantidadPrestamos);

module.exports = router;
