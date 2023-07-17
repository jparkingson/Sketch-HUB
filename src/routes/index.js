const express = require('express');
const router = express.Router();
const db = require('../../db/db');
const indexController = require('../controllers/indexController');
// Ruta para la página principal

router.get('/', indexController.mostrarIndex);
//router.get('/tienda', indexController.mostrarTienda);
router.get('/creadores', indexController.mostrarDiseñadores);
router.get('/perfil', indexController.mostrarPerfil);
router.get('/acceder', indexController.mostrarLogin);
router.get('/registro', indexController.mostrarRegistro);
router.get('/perfil-creador', indexController.mostrarPerfilCreador);
router.get('/editar-perfil', indexController.mostrarEditarPerfil);
router.get('/checkout', indexController.mostrarCheckout);


  module.exports = router;