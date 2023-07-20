const path = require('path');
const express = require('express');
const app = express();
const session = require('express-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./db/db');

const { cartMiddleware } = require('./src/controllers/carritoMiddleware');
const { userMiddleware } = require('./src/controllers/userMiddleware');

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

 app.use(cartMiddleware);
 app.use(userMiddleware);
// Importar rutas
const indexRoutes = require('./src/routes/index');
const carritoRoutes = require('./src/routes/carrito');
const tiendaRoutes = require('./src/routes/tienda');
const perfilRoutes = require('./src/routes/perfil');
const paypalRoutes = require('./src/routes/paypal');
const historialRoutes = require('./src/routes/historial')
const disenadorRoutes = require('./src/routes/disenador');

const cargarDisenoRoutes = require('./src/routes/cargar-diseno');
const actualizarPerfilRoutes = require('./src/routes/editar-perfil');




// rutas
app.use('/', indexRoutes);
app.use('/carrito', carritoRoutes);
app.use('/tienda', tiendaRoutes);
app.use('/perfil', perfilRoutes);
app.use('/paypal', paypalRoutes);
app.use('./historial', historialRoutes);
app.use('/disenador', disenadorRoutes);
app.use('/cargar', cargarDisenoRoutes);
app.use('/actualizar', actualizarPerfilRoutes);

app.use(express.static(path.join(__dirname,'/public')));
app.use(express.static(path.join(__dirname,'/node_modules')));

/*app.get('/', (req, res) => res.send('¡Hola Mundo!'));*/




app.get('/etiquetas', (req, res) => {
  const query = 'SELECT etiqueta1, etiqueta2, etiqueta3 FROM disenador WHERE idDisenador = ?';
  const idDisenador = 1; // Aquí deberías tener la ID del diseñador actual, en este caso, lo he configurado en 1

  db.query(query, [idDisenador], (error, result) => {
    if (error) {
      console.error('Error al obtener los datos de la base de datos:', error);
      return res.status(500).json({ error: 'Error al obtener los datos de la base de datos' });
    }

    const etiquetas = result[0]; // Obtener las etiquetas del resultado de la consulta
    res.json(etiquetas);
  });
});


//Inicialización del servidor
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
  });