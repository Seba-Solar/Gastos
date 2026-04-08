const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario_controller');

router.post('/crear', usuarioController.crearUsuario);
router.post('/eliminar/:id', usuarioController.borrarUsuario);
router.get('/',usuarioController.listarUsuarios);
router.post('/actualizar/:id', usuarioController.actualizarUsuario);

module.exports = router;