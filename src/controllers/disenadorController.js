const db = require('../../db/db');

exports.mostrarDiseñadores = (req, res) => {
    const query = 'SELECT d.idDisenador, u.nombre, u.apellido FROM disenador d JOIN usuario u ON d.idUsuario = u.idUsuario;';
  
    db.query(query, (error, resultados) => {
  
      if (error) {
        throw error;
      }
  
      res.render('pages/creadores', { diseñadores: resultados });
    });
  };

  exports.mostrarPerfilCreador = (req, res) => {
    const idDisenador = req.params.id;
    const query = `SELECT u.nombre, u.apellido, u.correo, u.telefono, u.direccion, u.ciudad, u.pais, d.descripcion, d.portafolio, d.fotoPerfil FROM disenador d JOIN usuario u ON d.idUsuario = u.idUsuario WHERE d.idDisenador = ${idDisenador};`;
  
    db.query(query, (error, resultados) => {
  
      if (error) {
        throw error;
      }
  
      res.redirect('/disenador', { perfil: resultados[0] });
    });
  }