// src/Login.js
import React, { useState } from 'react';

function Login() {
  // Estados locales para usuario y contraseña
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  

  // Función para manejar el submit del formulario
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validar usuario y contraseña (esto es solo un ejemplo)
    if (username === 'admin' && password === 'admin') {
      alert('Login exitoso');
      // Aquí puedes redirigir al usuario a otra página o manejar la lógica de autenticación
    } else {
      setErrorMessage('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default Login;