const db = require('../../db/db');

exports.agregarProducto = (req, res) => {
   const productId = req.body.idProducto;
   
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
  if (req.session.cart.some(item => item.productId === productId)) {
    // Si el producto ya está en el carrito, puedes mostrar un mensaje o redireccionar al carrito directamente
    res.redirect('/carrito'); // Por ejemplo, redirecciona al carrito
  } else {
    req.session.cart.push(results[0]);
    res.redirect(req.headers.referer);
  }

      

    }
  });
};
/*
exports.agregarProducto = (req, res) => {
  const productId = req.body.idProducto;
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
      const isProductInCart = req.session.cart.some(item => item.idProducto === productId);
      if (isProductInCart) {
        // Si el producto ya está en el carrito, puedes mostrar un mensaje o redireccionar al carrito directamente
        res.redirect('/carrito'); // Por ejemplo, redirecciona al carrito
      } else {
        req.session.cart.push(results[0]);
        res.redirect('/');
      }
    }
  });
};
*/

/*
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
*/
  /*
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
*/
// Eliminar un producto del carrito
exports.eliminarProducto = (req, res) => {
  const productId = req.query.productId;

  // Encuentra el índice del producto en el carrito
  const index = req.session.cart.findIndex(item => productId === productId);

  if (index !== -1) {
    // Elimina el producto del carrito
    req.session.cart.splice(index, 1);
  }

  res.redirect('/carrito');
};




/*
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

*/




exports.mostrarCarrito = (req, res) => {
  res.render('pages/carrito', { productos: req.session.cart });
}
