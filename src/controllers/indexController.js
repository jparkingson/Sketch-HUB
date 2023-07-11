const db = require('../../db/db');

exports.mostrarIndex = (req, res) => {
  const query = 'SELECT * FROM productos';
  db.query(query, (error, resultados) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al obtener los productos');
    } else {
      const productos = resultados;
      res.render('pages/index', { productos: productos });
    }
  });
};

exports.mostrarTienda = (req, res) => {
    db.query('SELECT * FROM productos', (error, results) => {
      if (error) {
        throw error;
      }
      res.render('pages/tienda', { productos: results });
    });
  };

  
  exports.mostrarDiseñadores = (req, res) => {
    res.render('pages/creadores');
  };
  
  exports.mostrarPerfil = (req, res) => {
    res.render('pages/perfil');
  };
  
  exports.mostrarLogin = (req, res) => {
    res.render('pages/acceder');
  };

  exports.mostrarRegistro = (req, res) => {
    res.render('pages/registro');
  }

  exports.mostrarPerfilCreador = (req, res) => {
    res.render('pages/perfil-creador');
  }

  exports.mostrarEditarPerfil = (req, res) => {
    res.render('pages/editar-perfil');
  }

  exports.mostrarCarrito = (req, res) => {
    res.render('pages/carrito');
  }