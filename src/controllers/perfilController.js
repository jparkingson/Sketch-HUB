const db = require('../../db/db');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const SHA256 = require('crypto-js/sha256');
const session = require('express-session');


exports.mostrarPerfilCreador = (req, res) => {
  if (req.session.user) {
    // El usuario ha iniciado sesión, mostrar la vista de perfil con la información del usuario
    const user = req.session.user;
    res.render('pages/perfil-creador', { user });
  } else {
    // El usuario no ha iniciado sesión, mostrar la vista de perfil con los formularios de inicio de sesión y registro
    res.render('pages/perfil-creador', { user: null });
  }
  };

exports.registro = (req, res) => {
    const datos = req.body;
  
    let usuarios = datos.reg_tipo_usuario; //cambiar en el input, si es usuario normal o diseñador
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
  
    db.query(buscar, [correo], (error, rows) => {
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
              res.redirect('pages/perfil-creador');
            }
          });
        }
      }
    });
  };

exports.login = (req, res) => {
    const info = req.body;
  
    let correo = info.email;
    let password = info.password;
  
    let buscar = "SELECT * FROM usuario WHERE correo = '" + correo + "'";
  
    conexion.query(buscar, (error, rows) => {
      if (error) {
        console.error(error);
        res.send('Ocurrió un error en la consulta');
      } else {
        if (rows.length > 0) {
          let usuario = rows[0]; // Tomar el primer registro encontrado
          // Hashear la contraseña ingresada por el usuario
          const hashedPasswordIngresada = SHA256(password).toString();
  
          if (usuario.contrasena === hashedPasswordIngresada) {
            console.log('Inicio de sesión exitoso');
            res.redirect('/perfil-creador'); // Redirecciona al perfil del creador
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
  };
  
  //--------------------------olvide mi contraseña------------------------
exports.olvideContra = async (req, res) => {
    try {
      res.render('pages/olvide'); // Aquí debes ajustar el nombre de tu archivo de vista (ejs)
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  };
