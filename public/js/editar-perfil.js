const express = require('express');
const router = express.Router();
const db = require('../../src/db/db');

// Ruta de acción del formulario
router.post('/actualizar', (req, res) => {
  const { nombre, apellido, correo, telefono, direccion, ciudad, estado, postal, etiqueta1, etiqueta2, etiqueta3, descripcion } = req.body;
  const idDisenador = 1;

  // Actualizar los datos en la base de datos en la tabla diseñador
  const query1 = 'UPDATE disenador SET descripcionPerfil = ?, etiqueta1 = ?, etiqueta2 = ?, etiqueta3 = ? WHERE idDisenador = 1';

  const query2 = 'UPDATE usuario SET nombre = ?,  apellido = ?, correo = ?, telefono = ?, direccion = ?, ciudad = ?, estado = ?, codigoPostal = ? WHERE idUsuario = 5';

  const query3 = 'SELECT etiqueta1, etiqueta2, etiqueta3 FROM disenador WHERE idDisenador = ?';

  db.query(query1, [descripcion, etiqueta1, etiqueta2, etiqueta3], (error, result) => {
    if (error) {
      console.error('Error al actualizar los datos en la base de datos:', error);
      return res.status(500).send('Error al actualizar los datos en la base de datos');
    }
    console.log('Datos actualizados correctamente en la base de datos');
    res.redirect('/perfil-creador'); // Redirigir a una página de éxito
  });

  db.query(query2, [nombre, apellido, correo, telefono, direccion, ciudad, estado, postal], (error, result) => {
    if (error) {
      console.error('Error al actualizar los datos en la base de datos:', error);
      return res.status(500).send('Error al actualizar los datos en la base de datos');
    }
    console.log('Datos actualizados correctamente en la base de datos');
  });


});

module.exports = router;