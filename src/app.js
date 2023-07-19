const path = require('path');
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// Configurar sesión
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false
}));


// Configurar body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Configuración de vistas y motor de plantilla
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Importar rutas
const indexRoutes = require('./routes/index');

// Rutas
app.use('/', indexRoutes);

// Directorios estáticos
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

// Inicialización del servidor
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`);
});

/*

app.use('/perfil-creador', (req, res, next) => {
  // Verificar si el usuario ha iniciado sesión
  if (req.session.tipouser) {
    // Si ha iniciado sesión, continuar con la siguiente ruta
    next();
  } else {
    // Si no ha iniciado sesión, redirigir al usuario a la página de inicio de sesión
    res.redirect('/perfil-creador');
  }
});*/
