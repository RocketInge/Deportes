const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Leer usuarios desde archivo JSON
function leerUsuarios() {
  if (!fs.existsSync('usuarios.json')) {
    fs.writeFileSync('usuarios.json', '{}');
  }
  const data = fs.readFileSync('usuarios.json');
  return JSON.parse(data);
}

// Guardar usuarios
function guardarUsuarios(usuarios) {
  fs.writeFileSync('usuarios.json', JSON.stringify(usuarios, null, 2));
}

// Ruta para registrar usuario
app.post('/registrar', (req, res) => {
  const { usuario, contrasena } = req.body;
  const usuarios = leerUsuarios();

  if (!usuario || !contrasena) {
    return res.status(400).json({ mensaje: 'Faltan campos' });
  }

  if (usuarios[usuario]) {
    return res.status(409).json({ mensaje: 'El usuario ya existe' });
  }

  usuarios[usuario] = contrasena;
  guardarUsuarios(usuarios);
  res.json({ mensaje: 'Usuario registrado con éxito' });
});

// Ruta para login
app.post('/login', (req, res) => {
  const { usuario, contrasena } = req.body;
  const usuarios = leerUsuarios();

  if (usuarios[usuario] === contrasena) {
    res.json({ mensaje: 'Inicio de sesión exitoso' });
  } else {
    res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
