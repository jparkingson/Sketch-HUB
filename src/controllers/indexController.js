const db = require('../../db/db');

const cookieParser = require('cookie-parser');
const SHA256 = require('crypto-js/sha256');
const session = require('express-session');


// variable productos disponible en todas las vistas de la aplicación web (middleware) 
exports.mostrarIndex = (req, res) => {
  const query = 'SELECT * FROM producto ORDER BY idProducto DESC LIMIT 6';

  db.query(query, (error, resultados) => {

    if (!req.session.cart) {
      req.session.cart = [];
    }

    res.render('pages/index', { productos: resultados, cart: req.session.cart });
  });
};



  

/*
  exports.mostrarPerfilCreador = (req, res) => {
    res.render('pages/perfil-creador');
  }
*/
  exports.mostrarEditarPerfil = (req, res) => {
    res.render('pages/editar-perfil');
  }
  exports.mostrarCheckout = (req, res) => {
    res.render('pages/checkout');
  }