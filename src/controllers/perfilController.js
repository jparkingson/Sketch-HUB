const db = require('../../db/db');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const SHA256 = require('crypto-js/sha256');
const session = require('express-session');
const cors = require('cors');
const sharp = require('sharp');
const express = require('express');
const router = express.Router();
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'imagen') {
      cb(null, 'C:/Users/kevin/DS9/Sketch-HUB/public/perfil/usuarioFoto'); //ruta de guardado de la imagen
    } else if (file.fieldname === 'archivoRAR') {
      cb(null, 'C:/Users/kevin/DS9/Sketch-HUB/public/productos/archivo'); //ruta de guardado del archivo
    } else {
      cb(new Error('Campo de archivo no válido'));
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, uniqueSuffix + extension);
  }
});

const upload = multer({ storage: storage }).fields([
  { name: 'imagen', maxCount: 1 }
]);

exports.registro = (req, res) => {
  // Llamamos al middleware 'upload' para manejar los archivos enviados en la solicitud
  upload(req, res, function (err) {
    if (err) {
      console.error('Error al cargar los archivos:', err);
      return res.status(500).send('Error al cargar los archivos');
    }

    const datos = req.body;
    let nombre = datos.reg_name;
    let apellido = datos.reg_lastname;
    let correo = datos.reg_email;
    let contras = datos.reg_password;
    let telefono = datos.reg_phone;
    let direccion = datos.reg_direccion;
    let ciudad = datos.reg_city;
    let estado = datos.reg_estado;
    let codigoPostal = datos.reg_postal;

    // Obtenemos la ruta de la imagen subida desde el middleware 'upload'
    const rutaImagen = req.files['imagen'] ? req.files['imagen'][0].path : null;

    // Obtener solo el nombre del archivo, sin la ruta completa
    const nombreImagen = rutaImagen ? path.basename(rutaImagen) : null;

    let hashedPassword = SHA256(contras).toString();

    let buscar = "SELECT * FROM usuario WHERE correo = ?";
    let registrar = "INSERT INTO usuario (nombre, apellido, correo, contrasena, telefono, direccion, ciudad, estado, codigoPostal, imgperfil) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(buscar, [correo], (error, rows) => {
      if (error) {
        console.error(error);
        res.send('Ocurrió un error en la consulta');
      } else {
        if (rows.length > 0) {
          console.log('Ya existe ese correo');
          res.send('Ya existe ese correo');
        } else {
          db.query(registrar, [nombre, apellido, correo, hashedPassword, telefono, direccion, ciudad, estado, codigoPostal, nombreImagen], (error) => {
            if (error) {
              console.error(error);
              res.send('Ocurrió un error al insertar los datos');
            } else {
              // Iniciar sesión después del registro
              req.session.user = {
                nombre,
                apellido,
                correo
              };

              console.log('Datos almacenados correctamente');
              res.redirect('/perfil');
            }
          });
        }
      }
    });
  });
};



exports.mostrarPerfilCreador = (req, res) => {
  if (req.session.user) {
    // El usuario ha iniciado sesión, mostrar la vista de perfil con la información del usuario
    const user = req.session.user;

    if (user.tipo === 'diseñador') {
      // Usuario es diseñador, obtener las ventas del diseñador
      ObtenerVentasPorDisenador(user.idDisenador, (error, ventas) => {
        if (error) {
          console.error(error);
          res.status(500).send('Error interno del servidor');
        } else {
          // Aquí realizamos una nueva consulta para obtener los productos asociados al diseñador
          const query = 'SELECT * FROM producto WHERE idDisenador = ?';
          db.query(query, [user.idDisenador], (error, productos) => {
            if (error) {
              console.error('Error al obtener los productos del diseñador:', error);
              res.status(500).send('Error al obtener los productos del diseñador');
            } else {
              // Realizamos una nueva consulta para obtener las compras del usuario diseñador
              ObtenerComprasPorUsuario(user.idUsuario, (error, compras) => {
                if (error) {
                  console.error(error);
                  res.status(500).send('Error interno del servidor');
                } else {
                  // Renderizar la vista y pasar tanto las ventas, productos y compras al EJS
                  res.render('pages/perfil-creador', { user, ventas, productos, compras });
                }
              });
            }
          });
        }
      });
    } else {
      // Usuario es normal, obtener las compras del usuario
      ObtenerComprasPorUsuario(user.idUsuario, (error, compras) => {
        if (error) {
          console.error(error);
          res.status(500).send('Error interno del servidor');
        } else {
          // Renderizar la vista y pasar las compras al EJS
          res.render('pages/perfil-creador', { user, compras });
        }
      });
    }
  } else {
    // El usuario no ha iniciado sesión, mostrar la vista de perfil con los formularios de inicio de sesión y registro
    res.render('pages/perfil-creador', { user: null });
  }
};

function ObtenerVentasPorDisenador(idDisenador, callback) {
  const query = "CALL ObtenerVentasPorDiseñador(?)";
  db.query(query, [idDisenador], (error, results) => {
    if (error) {
      callback(error);
    } else {
      const ventas = results[0]; // Suponiendo que las ventas están en el primer resultado del procedimiento almacenado
      callback(null, ventas);
    }
  });
};

function ObtenerComprasPorUsuario(idUsuario, callback) {
  const query = "CALL ObtenerComprasPorUsuario(?)";
  db.query(query, [idUsuario], (error, results) => {
    if (error) {
      callback(error);
    } else {
      const compras = results[0]; // Suponiendo que las compras están en el primer resultado del procedimiento almacenado
      callback(null, compras);
    }
  });
};





exports.login = (req, res) => {
    const info = req.body;
  
    let correo = info.email;
    let password = info.password;
  
    let buscar = "SELECT * FROM usuario WHERE correo = ?";
  
    db.query(buscar, [correo], (error, rows) => {
      if (error) {
        console.error(error);
        res.send('Ocurrió un error en la consulta');
      } else {
        if (rows.length > 0) {
          let usuario = rows[0]; // Tomar el primer registro encontrado
          const hashedPasswordIngresada = SHA256(password).toString();
  
          if (usuario.contrasena === hashedPasswordIngresada) {
            // Verificar si el usuario es diseñador
            let buscarDisenador = "SELECT * FROM disenador WHERE idUsuario = ?";
            db.query(buscarDisenador, [usuario.idUsuario], (error, disenadorRows) => {
              if (error) {
                console.error(error);
                res.send('Ocurrió un error en la consulta');
              } else {
                if (disenadorRows.length > 0) {
                  // Usuario es diseñador, guardar información de sesión
                  req.session.user = {
                    idDisenador: disenadorRows[0].idDisenador,
                    idUsuario: usuario.idUsuario,
                    correo: usuario.correo,
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    telefono: usuario.telefono,
                    direccion: usuario.direccion,
                    ciudad: usuario.ciudad,
                    estado: usuario.estado,
                    codigoPostal: usuario.codigoPostal,
                    img: usuario.imgperfil,
                    tipo: 'diseñador'
                  };
                } else {
                  // Usuario es normal, guardar información de sesión
                  req.session.user = {
                    idUsuario: usuario.idUsuario,
                    correo: usuario.correo,
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    telefono: usuario.telefono,
                    direccion: usuario.direccion,
                    ciudad: usuario.ciudad,
                    estado: usuario.estado,
                    codigoPostal: usuario.codigoPostal,
                    img: usuario.imgperfil,
                    tipo2: 'normal'
                  };
                }
  
                console.log('Inicio de sesión exitoso');
                res.redirect('/perfil'); // Redirecciona al perfil del usuario o diseñador
              }
            });
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
  
  exports.logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error al cerrar la sesión:', err);
      } else {
        console.log('Sesión cerrada correctamente');
      }
      // Redireccionar a la página de inicio u otra página después de cerrar la sesión
      res.redirect('/'); // Aquí puedes redireccionar a la página que prefieras
    });
  };

//crea un codigo para cerrar sesion



  //--------------------------olvide mi contraseña------------------------
exports.olvideContra = async (req, res) => {
    try {
      res.render('pages/olvide'); // Aquí debes ajustar el nombre de tu archivo de vista (ejs)
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  };
