exports.userMiddleware = (req, res, next) => {
    // Pasa la información del usuario a todas las vistas
    res.locals.user = req.session.user || null;
  
    next();
  };
  