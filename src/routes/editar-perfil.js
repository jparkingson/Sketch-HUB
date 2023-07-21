const express = require('express');
const router = express.Router();
const db = require('../../db/db');

// Ruta de acción del formulario
router.post('/actualizarPerfil', (req, res) => {
  const { idDisenador, idUsuario, nombre, apellido, correo, telefono, direccion, ciudad, estado, postal, etiqueta1, etiqueta2, etiqueta3, descripcion } = req.body;

  const query1 = 'UPDATE disenador SET descripcionPerfil = ?, etiqueta1 = ?, etiqueta2 = ?, etiqueta3 = ? WHERE idDisenador = ?';

  const query2 = 'UPDATE usuario SET nombre = ?,  apellido = ?, correo = ?, telefono = ?, direccion = ?, ciudad = ?, estado = ?, codigoPostal = ? WHERE idUsuario = ?';

  db.query(query1, [descripcion, etiqueta1, etiqueta2, etiqueta3, idDisenador], (error, result) => {
    if (error) {
      console.error('Error al actualizar los datos en la base de datos:', error);
      return res.status(500).send('Error al actualizar los datos en la base de datos');
    }
    console.log('Datos actualizados correctamente en la tabla disenador');

    // Call the second query inside the callback of the first one
    db.query(query2, [nombre, apellido, correo, telefono, direccion, ciudad, estado, postal, idUsuario], (error, result) => {
      if (error) {
        console.error('Error al actualizar los datos en la base de datos:', error);
        return res.status(500).send('Error al actualizar los datos en la base de datos');
      }
      console.log('Datos actualizados correctamente en la tabla usuario');
      res.redirect('/perfil'); // Redirect to a success page
    });
  });
});


router.post('/actualizarPerfilUsuario', (req, res) => {
  const { nombre, apellido, correo, telefono, direccion, ciudad, estado, postal} = req.body;
 
  const idUsuario = req.session.idUsuario;
  // Actualizar los datos en la base de datos en la tabla diseñador


  const query2 = 'UPDATE usuario SET nombre = ?,  apellido = ?, correo = ?, telefono = ?, direccion = ?, ciudad = ?, estado = ?, codigoPostal = ? WHERE idUsuario = ?';

 

  db.query(query2, [nombre, apellido, correo, telefono, direccion, ciudad, estado, postal, idUsuario], (error, result) => {
    if (error) {
      console.error('Error al actualizar los datos en la base de datos:', error);
      return res.status(500).send('Error al actualizar los datos en la base de datos');
    }
    console.log('Datos actualizados correctamente en la base de datos');
  });


});


module.exports = router;