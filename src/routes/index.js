const express = require('express');
const router = express.Router();

// Ruta para la página principal
router.get('/', async (req, res) => {
    try {
      res.render('pages/index'); // Aquí debes ajustar el nombre de tu archivo de vista (ejs)
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  });

router.get('/tienda', async (req, res) => {
    try {
        res.render('pages/tienda'); // Aquí debes ajustar el nombre de tu archivo de vista (ejs)
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});

router.get('/creadores', async (req, res) => {
    try {
        res.render('pages/creadores'); // Aquí debes ajustar el nombre de tu archivo de vista (ejs)
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});

router.get('/perfil', async (req, res) => {
  try {
      res.render('pages/perfil'); // Aquí debes ajustar el nombre de tu archivo de vista (ejs)
  } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
  }
});
/*
router.get('/acceder', async (req, res) => {
  try {
      res.render('pages/acceder'); // Aquí debes ajustar el nombre de tu archivo de vista (ejs)
  } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
  }
});

router.get('/registro', async (req, res) => {
  try {
      res.render('pages/registro'); // Aquí debes ajustar el nombre de tu archivo de vista (ejs)
  } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
  }
});*/

router.get('/perfil-creador', async (req, res) => {
  try {
      res.render('pages/perfil-creador'); // Aquí debes ajustar el nombre de tu archivo de vista (ejs)
  } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
  }
});

router.get('/editar-perfil', async (req, res) => {
  try {
      res.render('pages/editar-perfil'); // Aquí debes ajustar el nombre de tu archivo de vista (ejs)
  } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
  }
});


  module.exports = router;