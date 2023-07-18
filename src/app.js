const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const sharp = require ('sharp');
const bodyParser = require('body-parser');
const db = require('./db/db');

// Configurar la aplicación
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Configuración
app.set('port',process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views')); //Carpeta de las vistas
app.set('view engine', 'ejs'); // Motor de plantilla

// middlewares
app.use(morgan('dev')); // Con morgan podemos ver los procesos en la vista de la consola.
app.use(express.urlencoded({extended: false})) //Para interpretar los datos que vienen de un formulario y poder procesarlo
app.use(cors()); 

// Importar rutas
const indexRoutes = require('./routes/index');
const cargarDisenoRoutes = require('../public/js/cargar-diseno');
const actualizarPerfilRoutes = require('../public/js/editar-perfil');


// rutas
app.use('/', indexRoutes);

app.use(express.static(path.join(__dirname,'../public')));

app.use(express.static(path.join(__dirname,'../node_modules')));

app.use('/', cargarDisenoRoutes);

app.use('/', actualizarPerfilRoutes);

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

app.get('/perfil-creador', (req, res) => {
  res.render('perfil-creador');
});


/*app.get('/', (req, res) => res.send('¡Hola Mundo!'));*/


//Inicialización del servidor
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
  });