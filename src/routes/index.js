const express = require('express');
const router = express.Router();
const db = require('../../db/db');
const indexController = require('../controllers/indexController');
// Ruta para la página principal

router.get('/', indexController.mostrarIndex);

router.get('/editar-perfil', indexController.mostrarEditarPerfil);
router.get('/checkout', indexController.mostrarCheckout);



router.get('/verificado', async (req, res) => {
  try {
      res.render('pages/verificado'); // Aquí debes ajustar el nombre de tu archivo de vista (ejs)
  } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
  }
});

router.get('/cargar-diseno', async (req, res) => {
  try {
    // Obtener la información del usuario de la sesión
    const user = req.session.user || null;

    // Renderizar la vista 'cargar-diseno' y pasar la información del usuario
    res.render('pages/cargar-diseno', { user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});


  module.exports = router;
  
  //router.get('/perfil-creador', indexController.mostrarPerfilCreador);
//router.get('/validar', indexController.validarPerfil);
//router.get('/tienda', indexController.mostrarTienda);