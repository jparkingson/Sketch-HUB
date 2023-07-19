const path = require('path');
const express = require('express');
const app = express();
const session = require('express-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const { cartMiddleware } = require('./src/controllers/carritoMiddleware');

//Configuración
app.set('port',process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'src/views')); //Carpeta de las vistas
app.set('view engine', 'ejs'); // Motor de plantilla

// middlewares

app.use(morgan('dev')); // Con morgan podemos ver los procesos en la vista de la consola.
app.use(express.urlencoded({extended: true})) //Para interpretar los datos que vienen de un formulario y poder procesarlo
app.use(bodyParser.urlencoded({ extended: false }));


// Configuración de la sesión
app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // cambiar a true si estás en un entorno https
 }));


// Importar rutas
const indexRoutes = require('./src/routes/index');
const carritoRoutes = require('./src/routes/carrito');
const tiendaRoutes = require('./src/routes/tienda');
const perfilRoutes = require('./src/routes/perfil');
const paypalRoutes = require('./src/routes/paypal');
const historialRoutes = require('./src/routes/historial')

app.use(cartMiddleware);
// rutas
app.use('/', indexRoutes);
app.use('/carrito', carritoRoutes);
app.use('/tienda', tiendaRoutes);
app.use('/perfil', perfilRoutes);
app.use('/paypal', paypalRoutes);
app.use('./historial', historialRoutes);

app.use(express.static(path.join(__dirname,'/public')));
app.use(express.static(path.join(__dirname,'/node_modules')));

/*app.get('/', (req, res) => res.send('¡Hola Mundo!'));*/




//Inicialización del servidor
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
  });