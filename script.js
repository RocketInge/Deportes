const servidor = 'http://localhost:3000'; // Asegúrate que esté activo tu server.js

function registrar() {
  const usuario = document.getElementById('regUser').value;
  const contrasena = document.getElementById('regPass').value;

  if (!usuario || !contrasena) {
    alert('Completa todos los campos.');
    return;
  }

  fetch(`${servidor}/registrar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, contrasena })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.mensaje);
      document.getElementById('regUser').value = "";
      document.getElementById('regPass').value = "";
    })
    .catch(err => alert('Error al registrar: ' + err.message));
}

function iniciarSesion() {
  const usuario = document.getElementById('logUser').value;
  const contrasena = document.getElementById('logPass').value;

  fetch(`${servidor}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, contrasena })
  })
    .then(res => {
      if (!res.ok) throw new Error("Credenciales incorrectas");
      return res.json();
    })
    .catch(err => {
      alert('Error: ' + err.message);
    });
}