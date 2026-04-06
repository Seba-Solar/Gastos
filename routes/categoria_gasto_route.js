const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoria_gasto_controller');

router.get('/', categoriaController.listar);
router.post('/llamar/:id',categoriaController.llamarCategoriaId);
router.post('/editar/:id', categoriaController.actualizarCategoria);

module.exports = router;