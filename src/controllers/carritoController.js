const db = require('../../db/db');
/*
exports.agregarProducto = (req, res) => {
  const productId = req.body.id;
  const query = 'SELECT * FROM producto WHERE idProducto = ?';
  
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

      // Verificar si el producto ya está en el carrito
      const existingProduct = req.session.cart.find(product => product.idProducto === results[0].idProducto);
      if (existingProduct) {
        // El producto ya está en el carrito, puedes manejarlo como desees
        console.log('El producto ya está en el carrito');
      } else {
        // El producto no está en el carrito, agregarlo
        req.session.cart.push(results[0]);
        res.redirect('/');
      }
    }
  });
};
 */
exports.agregarProducto = (req, res) => {
  const productId = req.body.idProducto;
  const imagen = req.body.imagenURL;
  const productNombre = req.body.nombreProducto;
  const descripcion = req.body.descripcion;
  const productPrecio = req.body.precio;

  let count = 0;

  for (let i = 0; i < req.session.cart.length; i++) {
    if (req.session.cart[i].idProducto === productId) {
      
      count++;
    }
  }
  if (count === 0) {
    const cart_data = {
      idProducto: productId,
      imagenURL: imagen,
      nombreProducto: productNombre,
      descripcion: descripcion,
      precio: productPrecio,
      cantidad: 1
    };
    req.session.cart.push(cart_data);
  }
  res.redirect('/carrito');
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

  res.redirect('/carrito');
};

exports.eliminarProducto = (request, response) => {

	const product_id = request.query.id;

	for(let i = 0; i < request.session.cart.length; i++)
	{
		if(request.session.cart[i].product_id === product_id)
		{
			request.session.cart.splice(i, 1);
		}
	}

	response.redirect("/carrito");

};






exports.mostrarCarrito = (req, res) => {
  res.render('pages/carrito', { productos: req.session.cart });
}
