// cartMiddleware.js

exports.cartMiddleware = (req, res, next) => {
    // Pasa la información del carrito a todas las vistas
    res.locals.cart = req.session.cart || [];
    res.locals.cartQuantity = req.session.cart ? req.session.cart.length : 0;
  
    next();
  };
  