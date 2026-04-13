const express = require('express');
const router = express.Router();
const gastoController = require('../controllers/gasto_controller');

router.post('/crear', gastoController.crearGasto);
router.get('/crear_gasto',gastoController.crearGastoView);
router.post('/eliminar/:id', gastoController.eliminarGasto);
router.get('/',gastoController.obtenerTodos);
router.post('/actualizar/:id', gastoController.actualizarGasto);

module.exports = router;