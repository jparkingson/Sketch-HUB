const db = require('../../db/db');

exports.mostrarTienda = (req, res) => {
  db.query('SELECT * FROM productos', (error, results) => {
    if (error) {
      throw error;
    }
    res.render('pages/tienda', { productos: results });
  });
};
