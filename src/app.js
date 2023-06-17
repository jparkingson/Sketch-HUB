const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

//Configuración
app.set('port',process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views')); //Carpeta de las vistas
app.set('view engine', 'ejs'); // Motor de plantilla

// Importar rutas
const indexRoutes = require('./routes/index');

// rutas
app.use('/', indexRoutes);

app.use(express.static(path.join(__dirname,'../public')));

app.use(express.static(path.join(__dirname,'../node_modules')));
/*app.get('/', (req, res) => res.send('¡Hola Mundo!'));*/


// middlewares
app.use(morgan('dev')); // Con morgan podemos ver los procesos en la vista de la consola.
app.use(express.urlencoded({extended: false})) //Para interpretar los datos que vienen de un formulario y poder procesarlo



//Inicialización del servidor
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
  });