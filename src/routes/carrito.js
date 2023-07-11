
const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');

// Agregar un producto al carrito
router.post('/agregar', carritoController.agregarProducto);

// Eliminar un producto del carrito
router.delete('/eliminar/:id', carritoController.eliminarProducto);

// Obtener el precio total del carrito
router.get('/', carritoController.obtenerPrecioTotal);

module.exports = router;



module.exports = router;
