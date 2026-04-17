const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoria_gasto_controller');

router.get('/', categoriaController.categoriaView);
router.post('/llamar/:id',categoriaController.llamarCategoriaId);
router.post('/editar/:id', categoriaController.categoriaActualizarView);
router.post('/editar/categoria/:id', categoriaController.actualizarCategoria);
router.post('/crear', categoriaController.crearCategoria);
router.get('/crear_categoria', categoriaController.categoriaCrearView);
router.post('/eliminar/:id',categoriaController.eliminarCategoriaId);
module.exports = router;