const db = require('../../db/db');
/*
exports.mostrarDiseñadores = (req, res) => {
    const query = 'SELECT d.idDisenador, u.nombre, u.apellido FROM disenador d JOIN usuario u ON d.idUsuario = u.idUsuario;';
  
    db.query(query, (error, resultados) => {
  
      if (error) {
        throw error;
      }
  
      res.render('pages/creadores', { diseñadores: resultados });
    });
  };
*/

/*
exports.mostrarDiseñadores = (req, res) => {
  const query = 'SELECT d.idDisenador, u.nombre, u.apellido FROM disenador d JOIN usuario u ON d.idUsuario = u.idUsuario;';

  db.query(query, (error, resultados) => {
    if (error) {
      throw error;
    }

    res.render('pages/creadores', { diseñadores: resultados, productos: [] }); // Agregar la variable productos aquí
  });
};*/




exports.mostrarDiseñadores = (req, res) => {
  const query = 'SELECT d.idDisenador, u.nombre, u.apellido FROM disenador d JOIN usuario u ON d.idUsuario = u.idUsuario;';

  db.query(query, (error, resultados) => {
    if (error) {
      throw error;
    }

    const diseñadores = resultados;

    // Obtener los productos asociados a cada diseñador
    const obtenerProductos = (diseñadorId) => {
      return new Promise((resolve, reject) => {
        const queryProductos = `SELECT * FROM producto WHERE idDisenador = ${diseñadorId};`;

        db.query(queryProductos, (errorProductos, resultadosProductos) => {
          if (errorProductos) {
            reject(errorProductos);
          }
          resolve(resultadosProductos);
        });
      });
    };

    // Array para almacenar las promesas de obtención de productos de cada diseñador
    const obtenerProductosPromises = [];

    diseñadores.forEach((diseñador) => {
      obtenerProductosPromises.push(obtenerProductos(diseñador.idDisenador));
    });

    // Esperar a que todas las promesas se resuelvan y luego renderizar la página con los datos
    Promise.all(obtenerProductosPromises)
      .then((productos) => {
        diseñadores.forEach((diseñador, index) => {
          diseñador.productos = productos[index];
        });
        res.render('pages/creadores', { diseñadores }); // Agregamos los diseñadores que contienen los productos al contexto
      })
      .catch((error) => {
        throw error;
      });
  });
};


  /*
  exports.mostrarPerfilCreador = (req, res) => {
    const idDisenador = req.params.id;
    const query = `SELECT u.nombre, u.apellido, u.correo, u.telefono, u.direccion, u.ciudad, u.pais, d.descripcion, d.portafolio, d.fotoPerfil FROM disenador d JOIN usuario u ON d.idUsuario = u.idUsuario WHERE d.idDisenador = ${idDisenador};`;
  
    db.query(query, (error, resultados) => {
  
      if (error) {
        throw error;
      }
  
      res.redirect('/disenador', { perfil: resultados[0] });
    });
  };*/



 

