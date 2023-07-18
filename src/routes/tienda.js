const express = require('express');
const router = express.Router();
const tiendaController = require('../controllers/tiendaController');

router.get('/', tiendaController.mostrarTienda);
router.get('/filtrar', tiendaController.filtrarProductos);
router.get('/buscar', tiendaController.filtrarTexto);
router.get('/precio', tiendaController.precioProductos);

module.exports = router;
