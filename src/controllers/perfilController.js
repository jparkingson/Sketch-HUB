const db = require('../../db/db');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const SHA256 = require('crypto-js/sha256');
const session = require('express-session');

/*
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
  */
/*
exports.registro = (req, res) => {
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
    let foto = req.file;
  
    let hashedPassword = SHA256(contras).toString();
  
  
    let buscar = "SELECT * FROM usuario WHERE correo = '" + correo + "'";
    let registrar = "INSERT INTO usuario (nombre, apellido, correo, contrasena, telefono, direccion, ciudad, estado, codigoPostal, imgperfil) VALUES ('" + nombre + "','" + apellido + "','" + correo + "','" + hashedPassword + "','" + telefono + "','" + direccion + "','" + ciudad + "','" + estado + "','" + codigoPostal + "','" + foto + "')";
  
    db.query(buscar, [correo], (error, rows) => {
      if (error) {
        console.error(error);
        res.send('Ocurrió un error en la consulta');
      } else {
        if (rows.length > 0) {
          console.log('Ya existe ese correo');
          res.send('Ya existe ese correo');
        } else {
          db.query(registrar, (error) => {
            if (error) {
              console.error(error);
              res.send('Ocurrió un error al insertar los datos');
            } else {
              console.log('Datos almacenados correctamente');
              res.redirect('/perfil');
            }
          });
        }
      }
    });
  };
*/
/*
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
          res.render('pages/perfil-creador', { user, ventas });
        }
      });
    } else {
      // Usuario es normal, no es necesario obtener las ventas, renderizar la vista directamente
      res.render('pages/perfil-creador', { user });
    }
  } else {
    // El usuario no ha iniciado sesión, mostrar la vista de perfil con los formularios de inicio de sesión y registro
    res.render('pages/perfil-creador', { user: null });
  }
};*/
/*
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
              // Renderizar la vista y pasar tanto las ventas como los productos al EJS
              res.render('pages/perfil-creador', { user, ventas, productos });
            }
          });
        }
      });
    } else {
      // Usuario es normal, no es necesario obtener las ventas, renderizar la vista directamente
      res.render('pages/perfil-creador', { user });
    }
  } else {
    // El usuario no ha iniciado sesión, mostrar la vista de perfil con los formularios de inicio de sesión y registro
    res.render('pages/perfil-creador', { user: null });
  }
};
*/

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



exports.registro = (req, res) => {
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
  let foto = req.file;

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
        db.query(registrar, [nombre, apellido, correo, hashedPassword, telefono, direccion, ciudad, estado, codigoPostal, foto], (error) => {
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
};

/*
exports.login = (req, res) => {
    const info = req.body;
  
    let correo = info.email;
    let password = info.password;
  
    let buscar = "SELECT * FROM usuario WHERE correo = '" + correo + "'";
  
    db.query(buscar, (error, rows) => {
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
  */

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
                    tipo: 'diseñador'
                  };
                } else {
                  // Usuario es normal, guardar información de sesión
                  req.session.user = {
                    idUsuario: usuario.idUsuario,
                    correo: usuario.correo,
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    tipo: 'normal'
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
