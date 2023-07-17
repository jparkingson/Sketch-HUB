const db = require('../../db/db');

// variable productos disponible en todas las vistas de la aplicación web (middleware) 
/*
exports.productos = (req, res, next) => {
  const query = 'SELECT * FROM producto';
  db.query(query, (error, resultados) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al obtener los productos');
    } else {
      const productos = resultados;
      res.locals.productos = productos;
      next();
    }
  });
};*/
/*
exports.mostrarIndex = (req, res) => {
  const query = 'SELECT * FROM producto LIMIT 6';
  db.query(query, (error, resultados) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al obtener los productos');
    } else {
      const producto = resultados;
      res.render('pages/index', { productos: producto });
    }
  });
};*/

exports.mostrarIndex = (req, res) => {
  const query = 'SELECT * FROM producto LIMIT 6';

  db.query(query, (error, resultados) => {

    if (!req.session.cart) {
      req.session.cart = [];
    }

    res.render('pages/index', { productos: resultados, cart: req.session.cart });
  });
};


 /*exports.mostrarTienda = (req, res) => {
    db.query('SELECT * FROM productos', (error, results) => {
      if (error) {
        throw error;
      }
      res.render('pages/tienda', { productos: results });
    });
  };
*/
  
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



  exports.mostrarCheckout = (req, res) => {
    res.render('pages/checkout');
  }