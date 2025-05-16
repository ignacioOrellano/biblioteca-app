const express = require('express');
const prestamosController = require('../controllers/prestamosController');

const router = express.Router();

router.get('/', prestamosController.listar);
router.get('/nuevo', prestamosController.formulario);
router.post('/nuevo', prestamosController.crear);
router.post('/:id/devolver', prestamosController.devolver);

module.exports = router;
