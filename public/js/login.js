const login = document.getElementById('log');

login.addEventListener('submit', async (event) => {
  event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

  const email = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Crea un objeto con los datos del usuario
  const usuario = { email, password };

  try {
    // Envía una solicitud POST al endpoint de inicio de sesión en tu backend
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuario)
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.mensaje); // Muestra un mensaje de éxito
      // Realiza cualquier otra acción que desees después del inicio de sesión exitoso
    } else {
      alert(data.error); // Muestra un mensaje de error
    }
  } catch (error) {
    console.error(error);
    alert('Error en la solicitud'); // Muestra un mensaje de error genérico
  }
});

/*
onst express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/nombre_de_la_base_de_datos', {  //cambiar direccion del la bd de mongo
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Definición del esquema de usuario
const usuarioSchema = new mongoose.Schema({
  email: String,
  password: String,
});

// Modelo de usuario
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Endpoint de inicio de sesión
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Consulta la base de datos para encontrar al usuario con las credenciales proporcionadas
    const usuario = await Usuario.findOne({ email, password });

    if (usuario) {
      return res.status(200).json({ mensaje: 'Inicio de sesión exitoso' });
    } else {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
*/
