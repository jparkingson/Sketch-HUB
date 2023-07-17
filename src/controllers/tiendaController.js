const db = require('../../db/db');

exports.mostrarTienda = (req, res) => {
  const query = 'SELECT * FROM producto LIMIT 6';

  db.query(query, (error, resultados) => {

    if (!req.session.cart) {
      req.session.cart = [];
    }

    res.render('pages/index', { productos: resultados, cart: req.session.cart });
  });
};
  
