const db = require('../../db/db');

// Agregar un producto al carrito
exports.agregarProducto = (req, res) => {
  const productId = req.body.id;
  const query = 'SELECT * FROM productos WHERE id = ?';
  db.query(query, productId, (error, results) => {
    if (error) {
      throw error;
    }
    if (results.length === 0) {
      res.status(404).send('Producto no encontrado');
    } else {
      if (!req.session.cart) {
        req.session.cart = [];
      }
      req.session.cart.push(results[0]);
      res.redirect('/tienda');
    }
  });
};

// Eliminar un producto del carrito
exports.eliminarProducto = (req, res) => {
  const productId = req.params.id;

  // Encuentra el índice del producto en el carrito
  const index = req.session.cart.findIndex(item => item.id === productId);

  if (index !== -1) {
    // Elimina el producto del carrito
    req.session.cart.splice(index, 1);
  }

  res.redirect('/tienda');
};

// Obtener el precio total del carrito
exports.obtenerPrecioTotal = (req, res) => {
  const productosCarrito = req.session.cart || [];

  // Calcular el precio total
  const precioTotal = productosCarrito.reduce((total, producto) => total + producto.precio, 0);

  res.render('tienda', { productos: productosCarrito, precioTotal });
};
