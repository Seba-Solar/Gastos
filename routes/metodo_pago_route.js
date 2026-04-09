const express = require('express');
const router = express.Router();
const metodoPagoController = require('../controllers/metodo_pago_controller');

router.get('/', metodoPagoController.listar);
router.post('/llamar/:id',metodoPagoController.llamarMetodoPagoId);
router.post('/editar/:id', metodoPagoController.actualizarMetodoPago);
router.post('/crear', metodoPagoController.crearMetodoPago);
router.post('/eliminar/:id',metodoPagoController.eliminarMetodoPagoId);
module.exports = router;