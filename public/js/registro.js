/*const express = require("express");
const app= express();
const mysql = require("mysql");
const router = express.Router();



let conexion= mysql.createConnection({
host:"localhost",
database: "sketch hub",
user:"root",
password:""
});


app.set("view engine","ejs");


//se maneja datos desde paginas u otra ubicacion
app.use(express.json());
app.use(express.urlencoded({extended:false}));




//se creara la ruta para mostrar la pagina de registro
//en este caso se deja solo el "/" donde se pedira una peticion y se enviara una respuesta
//res porque esperamos una respuesta
app.get("/perfil-creador", function(req, res) {
  // Lógica para mostrar el formulario de registro
  res.render("perfil-creador"); // Renderiza la vista "registro.ejs"
});/*
app.get("/", function(req,res){
res.render("perfil-creador");
});*/
//ruta para validar lo que se ingrese por el formulario
//se pone req, porque es lo que se requiere y se guarda en la variable datos 
/*app.post("/validar", function(req, res){
    const datos= req.body;

    //let id= 0;
    let nombre = datos.reg_name;   //name viene del formulario y se guarda en una variable
    let apellido = datos.reg_lastname;   //name viene del formulario y se guarda en una variable
    let usuario = datos.reg_username;   //name viene del formulario y se guarda en una variable
    let correo = datos.reg_email;  //email viene del formulario y se guarda en una variable
    let contras= datos.re_password;   //pass viene del formulario y se guarda en una variable


    let buscar = "SELECT * FROM registro WHERE Email = '"+correo+"'  "; 

   conexion.query(buscar, function(error,row){
       if(error){
        throw error;
       } else{
         if(row.length>0){
            console.log("YA EXISTE ESE CORREO!!!");
         }else{
            
            let registrar = "INSERT INTO registro (Nombre, Apellido, Usuario, Email, Contrasenia) VALUE('"+nombre+"','"+apellido+"','"+usuario+"','"+correo+"','"+contras+"')";

            conexion.query(registrar, function(error){
               if(error){
                throw error;
               }else{
                console.log("Datos almacenados correctamente")
               }
            });       

         }
       }
    });
   
    console.log(datos); //para imprimir datos
});

module.exports = router;
/*
app.listen(3000, function(){
    console.log("Servidor creado http://localhost:3000");
});*/














/*const express = require("express");
const app= express();
const mysql = require("mysql");


let conexion= mysql.createConnection({
host:"localhost",
database: "bryan",
user:"root",
password:""
});


app.set("view engine","ejs");


//se maneja datos desde paginas u otra ubicacion
app.use(express.json());
app.use(express.urlencoded({extended:false}));




//se creara la ruta para mostrar la pagina de registro
//en este caso se deja solo el "/" donde se pedira una peticion y se enviara una respuesta
//res porque esperamos una respuesta
app.get("/", function(req,res){
res.render("registro");
});

//ruta para validar lo que se ingrese por el formulario
//se pone req, porque es lo que se requiere y se guarda en la variable datos
app.post("/validar",function(req,res){
    const datos= req.body;

    //let id= 0;
    let nombre = datos.name;   //name viene del formulario y se guarda en una variable
    let correo = datos.email;  //email viene del formulario y se guarda en una variable
    let contras= datos.pass;   //pass viene del formulario y se guarda en una variable


    let buscar = "SELECT * FROM registro WHERE Email = '"+correo+"'  "; 

   conexion.query(buscar, function(error,row){
       if(error){
        throw error;
       } else{
         if(row.length>0){
            console.log("YA EXISTE ESE CORREO!!!");
         }else{
            
            let registrar = "INSERT INTO registro (Nombre, Email, Contrasenia) VALUE('"+nombre+"','"+correo+"','"+contras+"')";

            conexion.query(registrar, function(error){
               if(error){
                throw error;
               }else{
                console.log("Datos almacenados correctamente")
               }
            });       

         }
       }
    });
   
 //   console.log(datos); //para imprimir datos
});


app.listen(3000, function(){
    console.log("Servidor creado http://localhost:3000");
});







//--------------------------------------------------------------------------------------
/*const registro = document.getElementById('registrar');
registro.addEventListener('submit', async (event) => {
  event.preventDefault(); 
/*
document.getElementById("registrar").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente*/
  
    // Obtener los valores de los campos del formulario
    /*var nombre = document.getElementById("reg_name").value;
    var apellido = document.getElementById("reg_lastname").value;
    var usuarios = document.getElementById("reg_username").value;
    var email = document.getElementById("reg_email").value;
    var password = document.getElementById("reg_password").value;
  
    // Crear un objeto para almacenar los datos del usuario
    var usuario = {
      nombre: reg_name,
      apellido: reg_lastname,
      usuarios: reg_username,
      email: reg_email,
      password: reg_password
    };

    try {
      // Envía una solicitud POST al endpoint de registro en tu backend
      const response = await fetch('/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
      });
  
    function verificarUsuarioRegistrado(email) {
        return usuario.hasOwnProperty(email);
      }


      
    // Enviar los datos a un servidor o almacenarlos localmente
    // Puedes realizar una petición AJAX utilizando la API Fetch
    fetch("url_del_servidor", {// poner url no de BD
      method: "POST",
      body: JSON.stringify(usuario),
      headers: {
        "Content-Type": "application/json"
      }
    })

    .then(function(response) {
      // Manejar la respuesta del servidor
      if (response.ok) {
        alert("Usuario registrado exitosamente");
      } else {
        alert("Error al registrar el usuario");
      }
    })
    .catch(function(error) {
      // Manejar errores
      console.log(error);
    });


  

    const data = await response.json();

    if (response.ok) {
      alert(data.mensaje); // Muestra un mensaje de éxito
      // Realiza cualquier otra acción que desees después del registro exitoso
    } else {
      alert(data.error); // Muestra un mensaje de error
    }
  } catch (error) {
    console.error(error);
    alert('Error en la solicitud'); // Muestra un mensaje de error genérico
  }
});

    //----------------------------registrar va en js de servidor--------------------------------------
/*
const express = require('express');
const mongoose = require('mongoose');

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/nombre_de_la_base_de_datos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Definición del esquema de usuario
const usuarioSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  usuarios: String,
  email: String,
  password: String,
});

// Modelo de usuario
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Creación de la aplicación Express
const app = express();
app.use(express.json());

// Endpoint de registro
app.post('/registro', async (req, res) => {
  const { nombre, apellido, usuarios, email, password } = req.body;

  try {
    // Verificar si el usuario ya está registrado
    const usuarioExistente = await Usuario.findOne({ email });

    if (usuarioExistente) {
      return res.status(400).json({ error: 'El usuario ya está registrado' });
    }

    // Crear un nuevo usuario
    const nuevoUsuario = new Usuario({ nombre, apellido, usuarios, email, password });
    await nuevoUsuario.save();

    return res.status(200).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
*/