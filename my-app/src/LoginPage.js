import React from 'react';

import { useNavigate } from 'react-router-dom';

 

const LoginPage = ({ setIsAuthenticated }) => {

  const navigate = useNavigate();

 

  const handleLogin = () => {

    // Aqu� ir�a tu l�gica de autenticaci�n

    setIsAuthenticated(true);

    navigate('/dashboard');

  };

 

  return (

    <div>

      <h2>Login Page</h2>

      <button onClick={handleLogin}>Login</button>

    </div>

  );

};
export default LoginPage;