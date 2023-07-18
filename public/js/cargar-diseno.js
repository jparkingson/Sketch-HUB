const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../../src/db/db');
const app = express();
const cors = require('cors');
const multer = require('multer');
const sharp = require('sharp');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'imagen') {
      cb(null, 'D:/AaronUniversidad/Desarrollo de Software IX/Sketch-Hub-Beta/public/img'); //ruta de guardado de la imagen
    } else if (file.fieldname === 'archivoRAR') {
      cb(null, 'D:/AaronUniversidad/Desarrollo de Software IX/Sketch-Hub-Beta/public/producto/archivo'); //ruta de guardado del archivo
    } else {
      cb(new Error('Campo de archivo no válido'));
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, uniqueSuffix + extension);
  }
});

const upload = multer({ storage: storage }).fields([
  { name: 'imagen', maxCount: 1 },
  { name: 'archivoRAR', maxCount: 1 }
]);

// Ruta de acción del formulario
router.post('/cargar', (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      console.error('Error al cargar los archivos:', err);
      return res.status(500).send('Error al cargar los archivos');
    }

    const { producto, categoria, precio, descripcion } = req.body;
    const idDisenador = 1;
    const rutaImagen = req.files['imagen'] ? req.files['imagen'][0].path : null;
    const rutaRAR = req.files['archivoRAR'] ? req.files['archivoRAR'][0].path : null;

    // Insertar los datos en la base de datos en la tabla producto
    const query ='INSERT INTO producto (idDisenador, nombreProducto, categoria, precio, descripcion, imagenURL, archivoURL) VALUES (?, ?, ?, ?, ?, ?, ?)';

    db.query(query, [idDisenador, producto, categoria, precio, descripcion, rutaImagen, rutaRAR], (error, result) => {
      if (error) {
        console.error('Error al insertar los datos en la base de datos:', error);
        return res.status(500).send('Error al insertar los datos en la base de datos');
      }
      console.log('Datos insertados correctamente en la base de datos');
      res.redirect('/perfil-creador'); // Redirigir a una página de éxito
    });
  });
});

module.exports = router;