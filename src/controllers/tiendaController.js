const db = require('../../db/db');
const resultsPerPage = 6;
/*
exports.mostrarTienda = (req, res) => {
  const query = 'SELECT * FROM producto ORDER BY idProducto DESC';

  db.query(query, (error, resultados) => {

    if (!req.session.cart) {
      req.session.cart = [];
    }

    res.render('pages/tienda', { productos: resultados, cart: req.session.cart });
  });
};
*/

// built a pagination function for the products in the store

exports.mostrarTienda = (req, res) => {
  let sql = 'SELECT * FROM producto ORDER BY idProducto DESC';
  db.query(sql, (err, result) => {
      if(err) throw err;
      const numOfResults = result.length;
      const resultsPerPage = 3; // Número de productos que se mostrarán por página
      const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
      let page = req.query.page ? Number(req.query.page) : 1;

      if(page < 1){
        res.redirect('/tienda/?page='+encodeURIComponent('1'));
        return;
      }else if(page > numberOfPages){
        res.redirect('/tienda/?page='+encodeURIComponent(numberOfPages));
        return;
      }

      // Determine the SQL LIMIT starting number
      const startingLimit = (page - 1) * resultsPerPage;
      // Get the relevant number of products for this starting page
      sql = `SELECT * FROM producto ORDER BY idProducto DESC LIMIT ${startingLimit},${resultsPerPage}`;
      db.query(sql, (err, result)=>{
          if(err) throw err;
       
          let iterator = Math.max(1, page - 1);
          let endingLink = Math.min(iterator + 9, numberOfPages);
          if (endingLink < (page + 1)) {
            iterator -= (page + 1) - endingLink;
          }
          res.render('pages/tienda', {productos: result, page, iterator, endingLink, numberOfPages, cart: req.session.cart });
     

      });
  });
};
exports.filtrarProductos = (req, res) => {
  const { categoria } = req.query;
  let sql = `SELECT * FROM producto WHERE categoria = '${categoria}' ORDER BY idProducto DESC`;
  db.query(sql, (err, result) => {
      if(err) throw err;
      const numOfResults = result.length;
      const resultsPerPage = 3; // Número de productos que se mostrarán por página
      const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
      let page = req.query.page ? Number(req.query.page) : 1;

      if(page < 1){
        res.redirect('/tienda/?page='+encodeURIComponent('1'));
        return;
      }else if(page > numberOfPages){
        res.redirect('/tienda/?page='+encodeURIComponent(numberOfPages));
        return;
      }

      // Determine the SQL LIMIT starting number
      const startingLimit = (page - 1) * resultsPerPage;
      // Get the relevant number of products for this starting page
      sql = `SELECT * FROM producto WHERE categoria = '${categoria}' ORDER BY idProducto DESC LIMIT ${startingLimit},${resultsPerPage}`;
      //sql = `SELECT * FROM producto ORDER BY idProducto DESC LIMIT ${startingLimit},${resultsPerPage}`;
      db.query(sql, (err, result)=>{
          if(err) throw err;
       
          let iterator = Math.max(1, page - 0);
          let endingLink = Math.min(iterator + 9, numberOfPages);
          if (endingLink < (page + 0)) {
            iterator -= (page + 1) - endingLink;
          }
          res.render('pages/tienda', {productos: result, page, iterator, endingLink, numberOfPages, cart: req.session.cart });
     

      });
  });
};

exports.filtrarTexto = (req, res) => {
  const texto  = req.query.texto;
  let sql = `SELECT * FROM producto WHERE nombreProducto LIKE '%${texto}%' ORDER BY idProducto DESC`;
  db.query(sql, (err, result) => {
      if(err) throw err;
      const numOfResults = result.length;
      const resultsPerPage = 6; // Número de productos que se mostrarán por página
      const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
      let page = req.query.page ? Number(req.query.page) : 1;

      if(page < 1){
        res.redirect('/tienda/?page='+encodeURIComponent('1'));
        return;
      }else if(page > numberOfPages){
        res.redirect('/tienda/?page='+encodeURIComponent(numberOfPages));
        return;
      }

      // Determine the SQL LIMIT starting number
      const startingLimit = (page - 1) * resultsPerPage;
      // Get the relevant number of products for this starting page
      sql = `SELECT * FROM producto WHERE nombreProducto LIKE '%${texto}%' ORDER BY idProducto DESC LIMIT ${startingLimit},${resultsPerPage}`;

      //sql = `SELECT * FROM producto ORDER BY idProducto DESC LIMIT ${startingLimit},${resultsPerPage}`;
      db.query(sql, (err, result)=>{
          if(err) throw err;
       
          let iterator = Math.max(1, page - 0);
          let endingLink = Math.min(iterator + 9, numberOfPages);
          if (endingLink < (page + 0)) {
            iterator -= (page + 1) - endingLink;
          }
          res.render('pages/tienda', {productos: result, page, iterator, endingLink, numberOfPages, cart: req.session.cart });
     

      });
  });
};

exports.precioProductos = (req, res) => {
  let precio  = req.query.precio;
  let sql = `SELECT * FROM producto WHERE precio <= '${precio}' ORDER BY idProducto DESC`;
  db.query(sql, (err, result) => {
      if(err) throw err;
      const numOfResults = result.length;
      const resultsPerPage = 3; // Número de productos que se mostrarán por página
      const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
      let page = req.query.page ? Number(req.query.page) : 1;

      if(page < 1){
        res.redirect('/tienda/?page='+encodeURIComponent('1'));
        return;
      }else if(page > numberOfPages){
        res.redirect('/tienda/?page='+encodeURIComponent(numberOfPages));
        return;
      }

      // Determine the SQL LIMIT starting number
      const startingLimit = (page - 1) * resultsPerPage;
      // Get the relevant number of products for this starting page
      sql = `SELECT * FROM producto WHERE precio <= ${precio} ORDER BY idProducto DESC LIMIT ${startingLimit},${resultsPerPage}`;

      //sql = `SELECT * FROM producto ORDER BY idProducto DESC LIMIT ${startingLimit},${resultsPerPage}`;
      db.query(sql, (err, result)=>{
          if(err) throw err;
       
          let iterator = Math.max(1, page - 0);
          let endingLink = Math.min(iterator + 9, numberOfPages);
          if (endingLink < (page + 0)) {
            iterator -= (page + 1) - endingLink;
          }
          res.render('pages/tienda', {productos: result, page, iterator, endingLink, numberOfPages, cart: req.session.cart });
     

      });
  });
};



