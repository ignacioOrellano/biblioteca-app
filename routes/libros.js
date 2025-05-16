const express = require('express');
const librosController = require('../controllers/librosController');

const router = express.Router();

router.get('/', librosController.listar);
router.get('/nuevo', librosController.formulario);
router.post('/nuevo', librosController.crear);

module.exports = router;
