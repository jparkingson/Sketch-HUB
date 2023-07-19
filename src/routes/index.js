const express = require('express');
const router = express.Router();
const multer = require('multer');
const cookieParser = require('cookie-parser');
const SHA256 = require('crypto-js/sha256');
const session = require('express-session');

const app = express();

app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false
}));

// Agrega el código de registro.js aquí
const mysql = require("mysql");
const { render } = require('ejs');

let conexion = mysql.createConnection({//cambiar los datos de la conexion
  host: "localhost",
  database: "sketch_hub",
  user: "root",
  password: ""
});
router.get('/', async (req, res) => {
  try {
    res.render('pages/index');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

// Ruta para la página de tienda
router.get('/tienda', async (req, res) => {
  try {
    res.render('pages/tienda');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

router.get('/editar-perfil', async (req, res) => {
  try {
    res.render('pages/editar-perfil');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

router.get('/perfil-logueado', async (req, res) => {
  try {
    res.render('pages/perfil-logueado');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

// Ruta para la página de creadores
router.get('/creadores', async (req, res) => {
  try {
    res.render('pages/creadores');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

// Ruta para la página de perfil
router.get('/perfil', async (req, res) => {
  try {
    res.render('pages/perfil');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

// Ruta para la página de perfil de creador
router.get('/perfil-creador', async (req, res) => {
  try {
      res.render('pages/perfil-creador'); // Aquí debes ajustar el nombre de tu archivo de vista (ejs)
  } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
  }
});
/*// Ruta para la página de perfil de creador
router.get('/perfil-creador', (req, res) => {
  // Verificar si el usuario ha iniciado sesión
  if (req.session.tipouser) {
    // Si el usuario ha iniciado sesión, renderizar la vista del perfil
    res.render('pages/perfil-logueado');
  } else {
    // Si el usuario no ha iniciado sesión, renderizar la vista del formulario de login/registro
    res.render('pages/perfil-creador');
  }
}); */

// Ruta para la página de edición de perfil
router.post('/perfil-creador/validar', (req, res) => {
  const datos = req.body;

  let usuarios = datos.reg_tipo_usuario; //cambiar en el input, si es usuario normal o diseñador

  //console.log(usuarios);
  let nombre = datos.reg_name;
  let apellido = datos.reg_lastname;
  let correo = datos.reg_email;
  let contras = datos.reg_password;
  let telefono = datos.reg_phone;
  let direccion = datos.reg_direccion;
  let ciudad = datos.reg_city;
  let estado = datos.reg_estado;
  let codigoPostal = datos.reg_postal;
  let foto = req.file;

  let hashedPassword = SHA256(contras).toString();
  
  let buscar = "SELECT * FROM usuario WHERE correo = '" + correo + "'";
  let registrar = "INSERT INTO usuario (idUsuario, nombre, apellido, correo, contrasena, telefono, direccion, ciudad, estado, codigoPostal, imgperfil) VALUES ('"+ usuarios +"','" + nombre + "','" + apellido + "','" + correo + "','" + hashedPassword + "','" + telefono + "','" + direccion + "','" + ciudad + "','" + estado + "','" + codigoPostal + "','" + foto + "')";

  //---------------Para saber el tipo de usuario-----------------------------


  conexion.query(buscar, [correo], (error, rows) => {
    if (error) {
      console.error(error);
      res.send('Ocurrió un error en la consulta');
    } else {
      if (rows.length > 0) {
        console.log('Ya existe ese correo');
        res.send('Ya existe ese correo');
      } else {
        conexion.query(registrar, (error) => {
          if (error) {
            console.error(error);
            res.send('Ocurrió un error al insertar los datos');
          } else {
            console.log('Datos almacenados correctamente');

            req.session.tipouser = usuarios;
console.log('['+nombre, req.session.tipouser+']');

            //req.session.loggedIn = true;

            res.redirect('/perfil-creador');
          }
        });
      }
    }
  }); 
  
});

//----------------- Ruta para validar el formulario de login-----------------------------
router.post('/perfil-creador/login', (req, res) => {
  const info = req.body;

  const correo = info.email;
  const password = info.password;

  const buscar = "SELECT * FROM usuario WHERE correo = '" + correo + "'";

  

  conexion.query(buscar, (error, rows) => {
    if (error) {
      console.error(error);
      res.send('Ocurrió un error en la consulta');
    } else {
      if (rows.length > 0) {
        const usuario = rows[0]; // Tomar el primer registro encontrado
        // Hashear la contraseña ingresada por el usuario
        const hashedPasswordIngresada = SHA256(password).toString();

        if (usuario.contrasena === hashedPasswordIngresada) {
          console.log('Inicio de sesión exitoso');


          const tipoUsuario = req.session.tipouser;

          // Redireccionar según el tipo de usuario
          if (tipoUsuario === 'Diseñador') {
            res.redirect('/perfil-logueado'); // Redirecciona al perfil del diseñador, cambiar a lo de aaron
            console.log(tipoUsuario);
          } else if (tipoUsuario === 'Comprador') {
            res.redirect('/perfil-creador'); // Redirecciona a la misma pagina, cambiar a perfil de usuario normal
            console.log(tipoUsuario);
          }
        } else {
          console.log('Contraseña incorrecta');
          res.send('Contraseña incorrecta');
        }
      } else {
        console.log('Correo electrónico no encontrado');
        res.send('Correo electrónico no encontrado');
      }
    }
  });
});


//--------------------------olvide mi contraseña------------------------
router.get('/olvide', async (req, res) => {
  try {
    res.render('pages/olvide'); // Aquí debes ajustar el nombre de tu archivo de vista (ejs)
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

//--------------------------logout------------------------
router.get('/logout', (req, res) => {
  // Destruye la sesión para desloguear al usuario
  req.session.destroy((error) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al cerrar sesión');
    } else {
      res.redirect('/login'); // Redirige a la página de inicio de sesión
    }
  });
});
module.exports = router;
